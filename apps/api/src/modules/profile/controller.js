const svc = require('./service');
const { success } = require('../../utils/apiResponse');
const path = require('path');

async function getMyProfile(req, res, next) {
  try { success(res, await svc.getMyProfile(req.user._id)); } catch (e) { next(e); }
}
async function getById(req, res, next) {
  try { success(res, await svc.getProfileByEmployeeId(req.params.id)); } catch (e) { next(e); }
}
async function update(req, res, next) {
  try { success(res, await svc.updateProfile(req.user._id, req.body), 'Profile updated'); } catch (e) { next(e); }
}
async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) return next(new Error('No file uploaded'));
    const fileUrl = `/uploads/${req.file.filename}`;
    success(res, await svc.uploadAvatar(req.user._id, fileUrl), 'Avatar updated');
  } catch (e) { next(e); }
}

module.exports = { getMyProfile, getById, update, uploadAvatar };
