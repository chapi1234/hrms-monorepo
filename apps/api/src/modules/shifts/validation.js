const { body } = require('express-validator');
const createShiftValidation = [
  body('name').trim().notEmpty(),
  body('startTime').matches(/^\d{2}:\d{2}$/).withMessage('Format HH:MM'),
  body('endTime').matches(/^\d{2}:\d{2}$/).withMessage('Format HH:MM'),
  body('workingDays').isArray({ min: 1 }),
];
module.exports = { createShiftValidation };
