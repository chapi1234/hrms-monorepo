const { body } = require('express-validator');

const createReviewValidation = [
  body('employee').isMongoId(),
  body('reviewDate').isISO8601(),
  body('period').isIn(['quarterly', 'bi-annual', 'annual']),
];

const submitScoresValidation = [
  body('scores.productivity').isInt({ min: 1, max: 5 }),
  body('scores.quality').isInt({ min: 1, max: 5 }),
  body('scores.teamwork').isInt({ min: 1, max: 5 }),
  body('scores.communication').isInt({ min: 1, max: 5 }),
  body('scores.initiative').isInt({ min: 1, max: 5 }),
  body('scores.punctuality').isInt({ min: 1, max: 5 }),
];

const createGoalValidation = [
  body('title').trim().notEmpty(),
  body('dueDate').optional().isISO8601(),
  body('category').optional().isIn(['performance', 'learning', 'career', 'personal']),
];

module.exports = { createReviewValidation, submitScoresValidation, createGoalValidation };
