const { body, query } = require('express-validator');

const createTaskValidation = [
  body('title').trim().notEmpty().withMessage('Task title required'),
  body('assignee').isMongoId().withMessage('Valid assignee employee ID required'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('dueDate').optional().isISO8601(),
  body('estimatedHours').optional().isNumeric(),
];

const updateTaskValidation = [
  body('title').optional().trim().notEmpty(),
  body('status').optional().isIn(['todo', 'in-progress', 'review', 'done', 'cancelled']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
];

const addCommentValidation = [
  body('text').trim().notEmpty().withMessage('Comment text required'),
];

module.exports = { createTaskValidation, updateTaskValidation, addCommentValidation };
