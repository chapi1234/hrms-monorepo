const Leave = require('../../models/Leave');
const LeaveType = require('../../models/LeaveType');
const Employee = require('../../models/Employee');
const Notification = require('../../models/Notification');
const { paginate } = require('../../utils/pagination');
const { getIO } = require('../../socket');

async function applyLeave(employeeId, userId, data) {
  // Check for overlapping leave
  const overlap = await Leave.findOne({
    employee: employeeId,
    status: { $in: ['pending', 'approved'] },
    $or: [
      { startDate: { $lte: new Date(data.endDate) }, endDate: { $gte: new Date(data.startDate) } },
    ],
  });
  if (overlap) {
    const e = new Error('You already have a leave request overlapping these dates');
    e.statusCode = 409;
    throw e;
  }

  const leave = await Leave.create({ employee: employeeId, ...data });

  // Notify HR managers
  const hrUsers = await require('../../models/User').find({ role: 'hr' });
  await Promise.all(hrUsers.map((hr) =>
    Notification.create({
      recipient: hr._id,
      sender: userId,
      type: 'leave-request',
      title: 'New Leave Request',
      message: `A new leave request has been submitted and needs approval`,
      link: `/leave/approvals`,
      metadata: { leaveId: leave._id },
    })
  ));

  // Real-time notification
  try {
    const io = getIO();
    hrUsers.forEach((hr) => io.to(`user:${hr._id}`).emit('notification', { type: 'leave-request' }));
  } catch (_) {}

  return leave.populate([
    { path: 'leaveType', select: 'name code color isPaid' },
    { path: 'employee', populate: { path: 'user', select: 'firstName lastName' } },
  ]);
}

async function getLeaves(filters = {}, options = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.employeeId) query.employee = filters.employeeId;
  if (filters.startDate || filters.endDate) {
    query.startDate = {};
    if (filters.startDate) query.startDate.$gte = new Date(filters.startDate);
    if (filters.endDate) query.startDate.$lte = new Date(filters.endDate);
  }

  return paginate(Leave, query, {
    ...options,
    populate: [
      { path: 'leaveType', select: 'name code color' },
      { path: 'employee', populate: { path: 'user', select: 'firstName lastName avatar' } },
      { path: 'approvedBy', select: 'firstName lastName' },
    ],
    sort: { createdAt: -1 },
  });
}

async function getPendingApprovals() {
  return Leave.find({ status: 'pending' })
    .populate({ path: 'employee', populate: { path: 'user', select: 'firstName lastName avatar' } })
    .populate('leaveType', 'name code color')
    .sort({ createdAt: 1 });
}

async function approveRejectLeave(leaveId, approverId, status, rejectionReason) {
  const leave = await Leave.findById(leaveId);
  if (!leave) { const e = new Error('Leave request not found'); e.statusCode = 404; throw e; }
  if (leave.status !== 'pending') {
    const e = new Error('Leave request is no longer pending');
    e.statusCode = 409;
    throw e;
  }

  leave.status = status;
  leave.approvedBy = approverId;
  leave.approvedAt = new Date();
  if (status === 'rejected') leave.rejectionReason = rejectionReason;
  await leave.save();

  // Get employee's user to notify
  const emp = await Employee.findById(leave.employee).populate('user');
  if (emp?.user) {
    const notifType = status === 'approved' ? 'leave-approved' : 'leave-rejected';
    await Notification.create({
      recipient: emp.user._id,
      sender: approverId,
      type: notifType,
      title: status === 'approved' ? 'Leave Approved' : 'Leave Rejected',
      message: status === 'approved'
        ? 'Your leave request has been approved'
        : `Your leave request has been rejected. Reason: ${rejectionReason || 'N/A'}`,
      link: '/leave',
    });
    try {
      const io = getIO();
      io.to(`user:${emp.user._id}`).emit('notification', { type: notifType, leaveId });
    } catch (_) {}
  }

  return leave;
}

async function cancelLeave(leaveId, userId) {
  const leave = await Leave.findById(leaveId);
  if (!leave) { const e = new Error('Leave not found'); e.statusCode = 404; throw e; }
  if (leave.status !== 'pending') { const e = new Error('Only pending leaves can be cancelled'); e.statusCode = 409; throw e; }
  leave.status = 'cancelled';
  return leave.save();
}

async function getLeaveBalance(employeeId) {
  const leaveTypes = await LeaveType.find({ isActive: true });
  const year = new Date().getFullYear();

  const balances = await Promise.all(leaveTypes.map(async (lt) => {
    const used = await Leave.aggregate([
      { $match: { employee: require('mongoose').Types.ObjectId.createFromHexString(String(employeeId)), leaveType: lt._id, status: 'approved', startDate: { $gte: new Date(`${year}-01-01`) } } },
      { $group: { _id: null, total: { $sum: '$totalDays' } } },
    ]);
    const usedDays = used[0]?.total || 0;
    return { leaveType: lt, maxDays: lt.maxDaysPerYear, usedDays, remainingDays: lt.maxDaysPerYear - usedDays };
  }));

  return balances;
}

module.exports = { applyLeave, getLeaves, getPendingApprovals, approveRejectLeave, cancelLeave, getLeaveBalance };
