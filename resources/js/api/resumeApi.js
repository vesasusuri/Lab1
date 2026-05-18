import axios from 'axios';

export function getResume() {
  return axios.get('/api/resume').then((r) => r.data);
}

export function uploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);

  return axios
    .post('/api/resume/upload', formData, { headers: { Accept: 'application/json' } })
    .then((r) => r.data);
}

export function analyzeResume(resumeId) {
  return axios.post(`/api/resume/${resumeId}/analyze`).then((r) => r.data);
}

export function getAtsScore(resumeId) {
  return axios.get(`/api/resume/${resumeId}/ats`).then((r) => r.data);
}

export function getJobMatch(resumeId, jobListingId = null) {
  const params = jobListingId ? { job_listing_id: jobListingId } : {};

  return axios.get(`/api/resume/${resumeId}/job-match`, { params }).then((r) => r.data);
}
