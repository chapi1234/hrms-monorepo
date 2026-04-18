const authService = require('./service');
const { success, created, error } = require('../../utils/apiResponse');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    created(res, result, 'Account created successfully');
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    success(res, result, 'Login successful');
  } catch (err) { next(err); }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return error(res, 'Refresh token required', 400);
    const tokens = await authService.refreshTokens(refreshToken);
    success(res, tokens, 'Tokens refreshed');
  } catch (err) { next(err); }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.user._id);
    success(res, null, 'Logged out successfully');
  } catch (err) { next(err); }
}

async function forgotPassword(req, res, next) {
  try {
    const token = await authService.forgotPassword(req.body.email);
    const data = process.env.NODE_ENV === 'development' ? { resetToken: token } : null;
    success(res, data, 'Password reset email sent (if email exists)');
  } catch (err) { next(err); }
}

async function resetPassword(req, res, next) {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    success(res, null, 'Password reset successfully');
  } catch (err) { next(err); }
}

async function changePassword(req, res, next) {
  try {
    await authService.changePassword(req.user._id, req.body.currentPassword, req.body.newPassword);
    success(res, null, 'Password changed successfully');
  } catch (err) { next(err); }
}

async function me(req, res) {
  success(res, req.user, 'User profile fetched');
}

module.exports = { register, login, refreshToken, logout, forgotPassword, resetPassword, changePassword, me };
