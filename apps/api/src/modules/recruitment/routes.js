const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createJobValidation, addCandidateValidation, updateCandidateStageValidation, scheduleInterviewValidation } = require('./validation');

router.use(authenticate, authorize('admin', 'hr'));

// Jobs
router.get('/jobs', c.listJobs);
router.post('/jobs', createJobValidation, validate, c.createJob);
router.put('/jobs/:id', c.updateJob);
router.get('/pipeline', c.pipeline);

// Candidates
router.get('/candidates', c.listCandidates);
router.post('/candidates', addCandidateValidation, validate, c.addCandidate);
router.patch('/candidates/:id/stage', updateCandidateStageValidation, validate, c.updateStage);

// Interviews
router.get('/interviews', c.listInterviews);
router.post('/interviews', scheduleInterviewValidation, validate, c.scheduleInterview);
router.put('/interviews/:id', c.updateInterview);

module.exports = router;
