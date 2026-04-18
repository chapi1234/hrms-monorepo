const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validate = require('../../middleware/validate');
const authenticate = require('../../middleware/authenticate');
const {
  loginValidation,
  registerValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require('./validation');

router.post('/register', registerValidation, validate, controller.register);
router.post('/login', loginValidation, validate, controller.login);
router.post('/refresh', controller.refreshToken);
router.post('/forgot-password', forgotPasswordValidation, validate, controller.forgotPassword);
router.post('/reset-password', resetPasswordValidation, validate, controller.resetPassword);

// Protected
router.use(authenticate);
router.post('/logout', controller.logout);
router.put('/change-password', changePasswordValidation, validate, controller.changePassword);
router.get('/me', controller.me);

module.exports = router;
