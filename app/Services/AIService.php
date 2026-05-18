<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    private const PARSED_SCHEMA = [
        'name' => '',
        'email' => '',
        'phone' => '',
        'skills' => [],
        'education' => [],
        'experience' => [],
        'projects' => [],
        'languages' => [],
        'certifications' => [],
    ];

    public function parseCvText(string $cvText): array
    {
        if (!config('resume.ollama.enabled')) {
            return $this->fallbackParse($cvText);
        }

        try {
            $prompt = $this->buildParsePrompt($cvText);
            $response = $this->chat($prompt, true);

            return $this->normalizeParsedData($this->decodeJson($response));
        } catch (\Throwable $exception) {
            Log::warning('Ollama CV parse failed, using fallback parser', [
                'message' => $exception->getMessage(),
            ]);

            return $this->fallbackParse($cvText);
        }
    }

    public function requestJson(string $prompt): array
    {
        return $this->decodeJson($this->chat($prompt, true));
    }

    public function chat(string $prompt, bool $json = false): string
    {
        $baseUrl = rtrim((string) config('resume.ollama.base_url'), '/');
        $model = (string) config('resume.ollama.model', 'llama3');
        $timeout = (int) config('resume.ollama.timeout', 120);

        $payload = [
            'model' => $model,
            'prompt' => $prompt,
            'stream' => false,
        ];

        if ($json) {
            $payload['format'] = 'json';
        }

        $response = Http::timeout($timeout)
            ->post("{$baseUrl}/api/generate", $payload)
            ->throw()
            ->json();

        return trim((string) ($response['response'] ?? ''));
    }

    public function embed(string $text): ?array
    {
        if (!config('resume.ollama.enabled')) {
            return null;
        }

        try {
            $baseUrl = rtrim((string) config('resume.ollama.base_url'), '/');
            $model = (string) config('resume.ollama.embedding_model', 'nomic-embed-text');

            $response = Http::timeout((int) config('resume.ollama.timeout', 120))
                ->post("{$baseUrl}/api/embeddings", [
                    'model' => $model,
                    'prompt' => $text,
                ])
                ->throw()
                ->json();

            $embedding = $response['embedding'] ?? null;

            return is_array($embedding) ? $embedding : null;
        } catch (\Throwable $exception) {
            Log::debug('Ollama embedding failed', ['message' => $exception->getMessage()]);

            return null;
        }
    }

    private function buildParsePrompt(string $cvText): string
    {
        $schema = json_encode(self::PARSED_SCHEMA, JSON_PRETTY_PRINT);

        return <<<PROMPT
Extract structured resume data from the CV text below.
Return JSON only with exactly these keys:
{$schema}

Rules:
- Use empty strings or empty arrays when data is missing.
- skills must be an array of strings.
- education items: institution, degree, start_date, end_date.
- experience items: company, role, start_date, end_date, description.
- projects items: name, description, technologies (array).
- languages items: language, level.
- certifications items: name, issuer, year.

CV TEXT:
{$cvText}
PROMPT;
    }

    private function decodeJson(string $raw): array
    {
        $raw = trim($raw);

        if (str_starts_with($raw, '```')) {
            $raw = preg_replace('/^```(?:json)?\s*/i', '', $raw) ?? $raw;
            $raw = preg_replace('/\s*```$/', '', $raw) ?? $raw;
        }

        $decoded = json_decode($raw, true);

        if (!is_array($decoded)) {
            throw new \RuntimeException('AI response was not valid JSON.');
        }

        return $decoded;
    }

    private function normalizeParsedData(array $data): array
    {
        $normalized = self::PARSED_SCHEMA;

        foreach ($normalized as $key => $default) {
            if (!array_key_exists($key, $data)) {
                continue;
            }

            $value = $data[$key];

            if (is_array($default)) {
                $normalized[$key] = is_array($value) ? array_values($value) : [];
                continue;
            }

            $normalized[$key] = is_string($value) ? trim($value) : (string) $value;
        }

        $normalized['skills'] = array_values(array_filter(array_map(
            fn ($skill) => is_string($skill) ? trim($skill) : '',
            $normalized['skills']
        )));

        return $normalized;
    }

    private function fallbackParse(string $cvText): array
    {
        $parsed = self::PARSED_SCHEMA;

        if (preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $cvText, $email)) {
            $parsed['email'] = $email[0];
        }

        if (preg_match('/(\+?\d[\d\s().-]{7,}\d)/', $cvText, $phone)) {
            $parsed['phone'] = trim($phone[1]);
        }

        $lines = array_values(array_filter(array_map('trim', explode("\n", $cvText))));
        $parsed['name'] = $lines[0] ?? '';

        $knownSkills = [
            'React', 'JavaScript', 'TypeScript', 'Node.js', 'Laravel', 'PHP', 'Python',
            'Docker', 'AWS', 'PostgreSQL', 'MySQL', 'Vue.js', 'Figma', 'Git', 'Kubernetes',
            'Tailwind', 'GraphQL', 'Redis', 'Java', 'C#', 'SQL', 'CI/CD', 'TensorFlow',
        ];

        $lower = mb_strtolower($cvText);
        foreach ($knownSkills as $skill) {
            if (str_contains($lower, mb_strtolower($skill))) {
                $parsed['skills'][] = $skill;
            }
        }

        $parsed['skills'] = array_values(array_unique($parsed['skills']));

        return $parsed;
    }
}
