const svc = require('./service');
const Employee = require('../../models/Employee');
const { success, created, paginated } = require('../../utils/apiResponse');

async function apply(req, res, next) {
  try {
    let employeeId = req.body.employeeId;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      if (!emp) return next(new Error('Employee profile not found'));
      employeeId = emp._id;
    }
    const leave = await svc.applyLeave(employeeId, req.user._id, req.body);
    created(res, leave, 'Leave request submitted');
  } catch (e) { next(e); }
}

async function list(req, res, next) {
  try {
    let filters = req.query;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      filters = { ...filters, employeeId: emp?._id };
    }
    const r = await svc.getLeaves(filters, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}

async function pendingApprovals(req, res, next) {
  try { success(res, await svc.getPendingApprovals()); } catch (e) { next(e); }
}

async function approveReject(req, res, next) {
  try {
    const leave = await svc.approveRejectLeave(req.params.id, req.user._id, req.body.status, req.body.rejectionReason);
    success(res, leave, `Leave ${req.body.status}`);
  } catch (e) { next(e); }
}

async function cancel(req, res, next) {
  try { success(res, await svc.cancelLeave(req.params.id, req.user._id), 'Leave cancelled'); } catch (e) { next(e); }
}

async function balance(req, res, next) {
  try {
    const emp = await Employee.findOne({ user: req.user._id });
    success(res, await svc.getLeaveBalance(emp?._id));
  } catch (e) { next(e); }
}

module.exports = { apply, list, pendingApprovals, approveReject, cancel, balance };
