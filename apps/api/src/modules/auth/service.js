const User = require('../../models/User');
const { generateTokens, verifyRefreshToken } = require('../../utils/jwt');
const { welcomeEmail } = require('../../utils/email');
const crypto = require('crypto');

async function register(data) {
  const { email, password, firstName, lastName, role, company } = data;

  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }

  const user = await User.create({ email, password, firstName, lastName, role, company });
  await welcomeEmail(email, `${firstName} ${lastName}`).catch(() => {});

  const tokens = generateTokens({ id: user._id, role: user.role });
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  return { user: sanitize(user), ...tokens };
}

async function login(email, password) {
  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }
  if (!user.isActive) {
    const err = new Error('Account deactivated. Contact administrator.');
    err.statusCode = 403;
    throw err;
  }

  user.lastLogin = new Date();
  const tokens = generateTokens({ id: user._id, role: user.role });
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  return { user: sanitize(user), ...tokens };
}

async function refreshTokens(token) {
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    const err = new Error('Invalid refresh token');
    err.statusCode = 401;
    throw err;
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== token) {
    const err = new Error('Refresh token reuse detected');
    err.statusCode = 401;
    throw err;
  }

  const tokens = generateTokens({ id: user._id, role: user.role });
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  return tokens;
}

async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}

async function forgotPassword(email) {
  const user = await User.findOne({ email });
  if (!user) return; // don't reveal if email exists

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  await require('../../utils/email').passwordResetEmail(email, resetUrl).catch(() => {});

  return token; // only returned in dev
}

async function resetPassword(token, newPassword) {
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    const err = new Error('Token is invalid or has expired');
    err.statusCode = 400;
    throw err;
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.refreshToken = undefined;
  await user.save();
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await User.findById(userId).select('+password');
  if (!user || !(await user.comparePassword(currentPassword))) {
    const err = new Error('Current password is incorrect');
    err.statusCode = 400;
    throw err;
  }
  user.password = newPassword;
  await user.save();
}

function sanitize(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.refreshToken;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  return obj;
}

module.exports = { register, login, refreshTokens, logout, forgotPassword, resetPassword, changePassword };
