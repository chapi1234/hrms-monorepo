// Recruitment module — 4 files
const { body } = require('express-validator');

const createJobValidation = [
  body('title').trim().notEmpty().withMessage('Job title required'),
  body('department').isMongoId().withMessage('Valid department ID required'),
  body('type').optional().isIn(['full-time', 'part-time', 'contract', 'intern']),
  body('status').optional().isIn(['draft', 'open', 'closed', 'on-hold']),
];

const updateCandidateStageValidation = [
  body('stage').isIn(['applied', 'screening', 'interview', 'offer', 'hired', 'rejected', 'withdrawn'])
    .withMessage('Invalid candidate stage'),
];

const addCandidateValidation = [
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('job').isMongoId().withMessage('Valid job ID required'),
];

const scheduleInterviewValidation = [
  body('candidate').isMongoId(),
  body('job').isMongoId(),
  body('scheduledAt').isISO8601(),
  body('type').optional().isIn(['phone', 'video', 'in-person', 'technical', 'hr']),
  body('interviewers').optional().isArray(),
];

module.exports = { createJobValidation, updateCandidateStageValidation, addCandidateValidation, scheduleInterviewValidation };
