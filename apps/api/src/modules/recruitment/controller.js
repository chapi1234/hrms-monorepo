const svc = require('./service');
const { success, created, paginated } = require('../../utils/apiResponse');

// Jobs
async function createJob(req, res, next) {
  try { created(res, await svc.createJob({ ...req.body, company: req.user.company, postedBy: req.user._id })); } catch (e) { next(e); }
}
async function listJobs(req, res, next) {
  try { const r = await svc.getJobs({ ...req.query, company: req.user.company }, req.query); paginated(res, r.data, r.pagination); } catch (e) { next(e); }
}
async function updateJob(req, res, next) {
  try { success(res, await svc.updateJob(req.params.id, req.body), 'Job updated'); } catch (e) { next(e); }
}
async function pipeline(req, res, next) {
  try { success(res, await svc.getPipelineStats(req.user.company)); } catch (e) { next(e); }
}

// Candidates
async function addCandidate(req, res, next) {
  try { created(res, await svc.addCandidate(req.body)); } catch (e) { next(e); }
}
async function listCandidates(req, res, next) {
  try { const r = await svc.getCandidates(req.query, req.query); paginated(res, r.data, r.pagination); } catch (e) { next(e); }
}
async function updateStage(req, res, next) {
  try { success(res, await svc.updateCandidateStage(req.params.id, req.body.stage), 'Stage updated'); } catch (e) { next(e); }
}

// Interviews
async function scheduleInterview(req, res, next) {
  try { created(res, await svc.scheduleInterview(req.body, req.user._id)); } catch (e) { next(e); }
}
async function listInterviews(req, res, next) {
  try { const r = await svc.getInterviews(req.query.candidateId, req.query); paginated(res, r.data, r.pagination); } catch (e) { next(e); }
}
async function updateInterview(req, res, next) {
  try { success(res, await svc.updateInterview(req.params.id, req.body), 'Interview updated'); } catch (e) { next(e); }
}

module.exports = { createJob, listJobs, updateJob, pipeline, addCandidate, listCandidates, updateStage, scheduleInterview, listInterviews, updateInterview };
