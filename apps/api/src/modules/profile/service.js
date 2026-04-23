const Profile = require('../../models/Profile');
const Employee = require('../../models/Employee');

async function getMyProfile(userId) {
  const employee = await Employee.findOne({ user: userId })
    .populate('user', 'firstName lastName email avatar lastLogin')
    .populate('department', 'name code')
    .populate('shift');

  if (!employee) { const e = new Error('Employee profile not found'); e.statusCode = 404; throw e; }

  const profile = await Profile.findOne({ employee: employee._id });
  return { employee, profile };
}

async function getProfileByEmployeeId(employeeId) {
  const employee = await Employee.findById(employeeId)
    .populate('user', 'firstName lastName email avatar')
    .populate('department', 'name code');
  if (!employee) { const e = new Error('Employee not found'); e.statusCode = 404; throw e; }
  const profile = await Profile.findOne({ employee: employeeId });
  return { employee, profile };
}

async function updateProfile(userId, data) {
  const employee = await Employee.findOne({ user: userId });
  if (!employee) { const e = new Error('Employee profile not found'); e.statusCode = 404; throw e; }

  let profile = await Profile.findOne({ employee: employee._id });
  if (!profile) profile = new Profile({ employee: employee._id });

  Object.assign(profile, data);
  await profile.save();
  return profile;
}

async function uploadAvatar(userId, fileUrl) {
  const User = require('../../models/User');
  await User.findByIdAndUpdate(userId, { avatar: fileUrl });
  return { avatarUrl: fileUrl };
}

module.exports = { getMyProfile, getProfileByEmployeeId, updateProfile, uploadAvatar };
