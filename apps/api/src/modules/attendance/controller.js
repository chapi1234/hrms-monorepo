const svc = require('./service');
const Employee = require('../../models/Employee');
const { success, created, paginated } = require('../../utils/apiResponse');

async function checkIn(req, res, next) {
  try {
    let { employeeId } = req.body;
    if (!employeeId) {
      const emp = await Employee.findOne({ user: req.user._id });
      if (!emp) return next(new Error('Employee profile not found for this user'));
      employeeId = emp._id;
    }
    const record = await svc.checkIn(employeeId, req.body);
    created(res, record, 'Checked in successfully');
  } catch (e) { next(e); }
}

async function checkOut(req, res, next) {
  try {
    let { employeeId } = req.body;
    if (!employeeId) {
      const emp = await Employee.findOne({ user: req.user._id });
      if (!emp) return next(new Error('Employee profile not found for this user'));
      employeeId = emp._id;
    }
    const record = await svc.checkOut(employeeId, req.body);
    success(res, record, 'Checked out successfully');
  } catch (e) { next(e); }
}

async function list(req, res, next) {
  try {
    let filters = req.query;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      filters = { ...filters, employeeId: emp?._id };
    }
    const r = await svc.getAttendance(filters, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}

async function todaySummary(req, res, next) {
  try { success(res, await svc.getTodaySummary(req.user.company)); } catch (e) { next(e); }
}

async function manualEntry(req, res, next) {
  try { created(res, await svc.createManualEntry(req.body, req.user._id), 'Attendance entry created'); } catch (e) { next(e); }
}

module.exports = { checkIn, checkOut, list, todaySummary, manualEntry };
