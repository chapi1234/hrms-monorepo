const { body } = require('express-validator');

const updateProfileValidation = [
  body('phone').optional().trim(),
  body('dateOfBirth').optional().isISO8601(),
  body('gender').optional().isIn(['male', 'female', 'other', 'prefer-not-to-say']),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('address').optional().isObject(),
  body('emergencyContacts').optional().isArray(),
  body('bankDetails').optional().isObject(),
];

module.exports = { updateProfileValidation };
