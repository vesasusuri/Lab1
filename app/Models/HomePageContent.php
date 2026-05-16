<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePageContent extends Model
{
    protected $fillable = [
        'proof_text',
        'hero_title',
        'hero_subtitle',
        'primary_cta',
        'secondary_cta',
        'categories_title',
        'categories_cta',
        'companies_eyebrow',
        'companies_title',
        'companies_description',
        'companies_cta',
        'companies_page_hero_eyebrow',
        'companies_page_hero_title',
        'companies_page_hero_description',
        'companies_page_featured_title',
        'companies_page_featured_description',
        'companies_page_primary_cta',
        'find_job_title',
        'find_job_highlight',
        'find_job_description',
        'find_job_cta',
    ];
}
