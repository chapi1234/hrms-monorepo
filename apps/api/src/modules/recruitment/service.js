const Job = require('../../models/Job');
const Candidate = require('../../models/Candidate');
const Interview = require('../../models/Interview');
const { paginate } = require('../../utils/pagination');

// Jobs
async function createJob(data) { return Job.create(data); }
async function getJobs(filters = {}, options = {}) {
  const q = {};
  if (filters.status) q.status = filters.status;
  if (filters.department) q.department = filters.department;
  if (filters.company) q.company = filters.company;
  return paginate(Job, q, { ...options, populate: [{ path: 'department', select: 'name' }, { path: 'postedBy', select: 'firstName lastName' }] });
}
async function updateJob(id, data) {
  const job = await Job.findByIdAndUpdate(id, data, { new: true });
  if (!job) { const e = new Error('Job not found'); e.statusCode = 404; throw e; }
  return job;
}

// Candidates
async function addCandidate(data) { return Candidate.create(data); }
async function getCandidates(filters = {}, options = {}) {
  const q = {};
  if (filters.job) q.job = filters.job;
  if (filters.stage) q.stage = filters.stage;
  return paginate(Candidate, q, { ...options, populate: [{ path: 'job', select: 'title' }], sort: { createdAt: -1 } });
}
async function updateCandidateStage(id, stage) {
  const c = await Candidate.findByIdAndUpdate(id, { stage }, { new: true });
  if (!c) { const e = new Error('Candidate not found'); e.statusCode = 404; throw e; }
  return c;
}

// Interviews
async function scheduleInterview(data, scheduledBy) { return Interview.create({ ...data, scheduledBy }); }
async function getInterviews(candidateId, options = {}) {
  return paginate(Interview, candidateId ? { candidate: candidateId } : {}, {
    ...options,
    populate: [
      { path: 'candidate', select: 'firstName lastName email' },
      { path: 'interviewers', select: 'firstName lastName' },
    ],
    sort: { scheduledAt: 1 },
  });
}
async function updateInterview(id, data) {
  const i = await Interview.findByIdAndUpdate(id, data, { new: true });
  if (!i) { const e = new Error('Interview not found'); e.statusCode = 404; throw e; }
  return i;
}

// Pipeline stats
async function getPipelineStats(companyId) {
  return Candidate.aggregate([
    { $lookup: { from: 'jobs', localField: 'job', foreignField: '_id', as: 'jobData' } },
    { $match: { 'jobData.company': companyId ? require('mongoose').Types.ObjectId.createFromHexString(String(companyId)) : { $exists: true } } },
    { $group: { _id: '$stage', count: { $sum: 1 } } },
  ]);
}

module.exports = { createJob, getJobs, updateJob, addCandidate, getCandidates, updateCandidateStage, scheduleInterview, getInterviews, updateInterview, getPipelineStats };
