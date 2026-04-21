const { body, query } = require('express-validator');

const createEmployeeValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  body('employeeId').optional().trim(),
  body('department').optional().isMongoId().withMessage('Valid department ID required'),
  body('position').trim().notEmpty().withMessage('Position required'),
  body('hireDate').isISO8601().withMessage('Valid hire date required'),
  body('employmentType').optional().isIn(['full-time', 'part-time', 'contract', 'intern']),
  body('salary.basic').optional().isNumeric().withMessage('Salary must be a number'),
];

const updateEmployeeValidation = [
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('department').optional().isMongoId(),
  body('position').optional().trim().notEmpty(),
  body('status').optional().isIn(['active', 'inactive', 'on-leave', 'terminated']),
  body('salary.basic').optional().isNumeric(),
];

const listValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['active', 'inactive', 'on-leave', 'terminated']),
  query('department').optional().isMongoId(),
];

module.exports = { createEmployeeValidation, updateEmployeeValidation, listValidation };
