const { body, query } = require('express-validator');

const applyLeaveValidation = [
  body('leaveType').isMongoId().withMessage('Valid leave type ID required'),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required'),
  body('reason').optional().trim().isLength({ max: 500 }),
  body('isHalfDay').optional().isBoolean(),
  body('halfDayPeriod').optional().isIn(['morning', 'afternoon']),
];

const approveRejectValidation = [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('rejectionReason').optional().trim(),
];

const listValidation = [
  query('status').optional().isIn(['pending', 'approved', 'rejected', 'cancelled']),
  query('employeeId').optional().isMongoId(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
];

module.exports = { applyLeaveValidation, approveRejectValidation, listValidation };
