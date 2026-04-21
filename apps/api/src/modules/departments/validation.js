const { body } = require('express-validator');

const createDeptValidation = [
  body('name').trim().notEmpty().withMessage('Department name required'),
  body('code').optional().trim(),
  body('head').optional().isMongoId(),
  body('parentDepartment').optional().isMongoId(),
  body('budget').optional().isNumeric(),
];

const updateDeptValidation = [
  body('name').optional().trim().notEmpty(),
  body('head').optional().isMongoId(),
  body('budget').optional().isNumeric(),
];

module.exports = { createDeptValidation, updateDeptValidation };
