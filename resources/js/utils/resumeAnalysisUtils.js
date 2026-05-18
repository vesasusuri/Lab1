export const mapParsedToProfile = (parsed = {}) => {
  const skills = Array.isArray(parsed.skills) ? parsed.skills.filter(Boolean) : [];

  const experiences = (parsed.experience || []).map((item, index) => ({
    id: Date.now() + index,
    company: item.company || '',
    role: item.role || item.title || '',
    startDate: item.start_date || item.startDate || '',
    endDate: item.end_date || item.endDate || '',
    current: !item.end_date && !item.endDate,
    description: item.description || '',
  }));

  const education = (parsed.education || []).map((item, index) => ({
    id: Date.now() + index + 1000,
    school: item.institution || item.school || '',
    degree: item.degree || '',
    startDate: item.start_date || item.startDate || '',
    endDate: item.end_date || item.endDate || '',
    current: false,
  }));

  const languages = (parsed.languages || []).map((item, index) => ({
    id: Date.now() + index + 2000,
    language: item.language || item.name || '',
    level: item.level || 'Fluent',
  }));

  return { skills, experiences, education, languages };
};

export const ANALYSIS_STEPS = {
  idle: '',
  uploading: 'Uploading your CV…',
  extracting: 'Extracting text from PDF…',
  parsing: 'Parsing your CV with AI…',
  rating: 'Calculating ATS score…',
  matching: 'Matching your profile to jobs…',
};
