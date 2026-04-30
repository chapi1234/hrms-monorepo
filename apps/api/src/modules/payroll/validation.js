const { body, query } = require('express-validator');

const generatePayrollValidation = [
  body('employeeId').isMongoId().withMessage('Valid employee ID required'),
  body('period.month').isInt({ min: 1, max: 12 }).withMessage('Valid month required'),
  body('period.year').isInt({ min: 2000 }).withMessage('Valid year required'),
  body('basicSalary').isNumeric().withMessage('Basic salary required'),
];

const bulkGenerateValidation = [
  body('month').isInt({ min: 1, max: 12 }),
  body('year').isInt({ min: 2000 }),
];

const listValidation = [
  query('month').optional().isInt({ min: 1, max: 12 }),
  query('year').optional().isInt({ min: 2000 }),
  query('status').optional().isIn(['draft', 'pending', 'approved', 'paid']),
  query('employeeId').optional().isMongoId(),
];

module.exports = { generatePayrollValidation, bulkGenerateValidation, listValidation };
