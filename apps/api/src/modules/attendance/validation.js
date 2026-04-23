const { body, query } = require('express-validator');

const checkInValidation = [
  body('employeeId').optional().isMongoId().withMessage('Valid employee ID required'),
  body('location').optional().isObject(),
  body('method').optional().isIn(['manual', 'qr', 'biometric', 'app']),
];

const checkOutValidation = [
  body('employeeId').optional().isMongoId().withMessage('Valid employee ID required'),
  body('location').optional().isObject(),
];

const manualEntryValidation = [
  body('employeeId').isMongoId().withMessage('Valid employee ID required'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('checkIn').isISO8601().withMessage('Valid check-in time required'),
  body('checkOut').optional().isISO8601(),
  body('status').isIn(['present', 'absent', 'late', 'half-day', 'weekend', 'holiday']),
];

const listValidation = [
  query('employeeId').optional().isMongoId(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  query('status').optional().isIn(['present', 'absent', 'late', 'half-day', 'weekend', 'holiday', 'on-leave']),
];

module.exports = { checkInValidation, checkOutValidation, manualEntryValidation, listValidation };
