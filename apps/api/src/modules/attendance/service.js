const Attendance = require('../../models/Attendance');
const Employee = require('../../models/Employee');
const { paginate } = require('../../utils/pagination');

async function checkIn(employeeId, data) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let record = await Attendance.findOne({ employee: employeeId, date: today });
  if (record && record.checkIn?.time) {
    const e = new Error('Already checked in today');
    e.statusCode = 409;
    throw e;
  }

  if (!record) {
    record = new Attendance({ employee: employeeId, date: today });
  }

  record.checkIn = { time: new Date(), location: data.location, method: data.method || 'app' };

  // Determine if late (compare against shift start time)
  const employee = await Employee.findById(employeeId).populate('shift');
  if (employee?.shift) {
    const [sh, sm] = employee.shift.startTime.split(':').map(Number);
    const shiftStart = new Date(today);
    shiftStart.setHours(sh, sm + (employee.shift.graceTimeIn || 15), 0, 0);
    record.status = record.checkIn.time > shiftStart ? 'late' : 'present';
  } else {
    record.status = 'present';
  }

  await record.save();
  return record;
}

async function checkOut(employeeId, data) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({ employee: employeeId, date: today });
  if (!record || !record.checkIn?.time) {
    const e = new Error('No check-in found for today');
    e.statusCode = 400;
    throw e;
  }
  if (record.checkOut?.time) {
    const e = new Error('Already checked out today');
    e.statusCode = 409;
    throw e;
  }

  record.checkOut = { time: new Date(), location: data.location, method: data.method || 'app' };
  await record.save();
  return record;
}

async function getAttendance(filters = {}, options = {}) {
  const query = {};
  if (filters.employeeId) query.employee = filters.employeeId;
  if (filters.status) query.status = filters.status;
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.date.$lte = new Date(filters.endDate);
  }
  return paginate(Attendance, query, {
    ...options,
    populate: [{ path: 'employee', populate: { path: 'user', select: 'firstName lastName avatar' } }],
    sort: { date: -1 },
  });
}

async function getTodaySummary(companyId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [present, absent, late, totalEmployees] = await Promise.all([
    Attendance.countDocuments({ date: today, status: 'present' }),
    Attendance.countDocuments({ date: today, status: 'absent' }),
    Attendance.countDocuments({ date: today, status: 'late' }),
    Employee.countDocuments({ company: companyId, status: 'active' }),
  ]);

  return { date: today, totalEmployees, present, absent, late, notMarked: totalEmployees - present - absent - late };
}

async function createManualEntry(data, userId) {
  const entry = await Attendance.findOneAndUpdate(
    { employee: data.employeeId, date: new Date(data.date) },
    {
      checkIn: { time: data.checkIn ? new Date(data.checkIn) : undefined },
      checkOut: { time: data.checkOut ? new Date(data.checkOut) : undefined },
      status: data.status,
      notes: data.notes,
      isManualEntry: true,
      approvedBy: userId,
    },
    { upsert: true, new: true, runValidators: true }
  );
  return entry;
}

module.exports = { checkIn, checkOut, getAttendance, getTodaySummary, createManualEntry };
