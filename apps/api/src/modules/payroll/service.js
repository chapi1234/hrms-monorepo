const Payroll = require('../../models/Payroll');
const Employee = require('../../models/Employee');
const Attendance = require('../../models/Attendance');
const Leave = require('../../models/Leave');
const { paginate } = require('../../utils/pagination');

async function generatePayroll(data, generatedBy) {
  const { employeeId, period, basicSalary, allowances = [], deductions = [], tax = 0, notes } = data;

  // Check duplicate
  const existing = await Payroll.findOne({ employee: employeeId, 'period.month': period.month, 'period.year': period.year });
  if (existing) { const e = new Error('Payroll already generated for this period'); e.statusCode = 409; throw e; }

  // Calculate worked days from attendance
  const startDate = new Date(period.year, period.month - 1, 1);
  const endDate = new Date(period.year, period.month, 0);

  const [attendanceData, leaveData] = await Promise.all([
    Attendance.countDocuments({ employee: employeeId, date: { $gte: startDate, $lte: endDate }, status: 'present' }),
    Leave.aggregate([
      { $match: { employee: require('mongoose').Types.ObjectId.createFromHexString(String(employeeId)), status: 'approved', startDate: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, total: { $sum: '$totalDays' } } },
    ]),
  ]);

  const payroll = await Payroll.create({
    employee: employeeId,
    period,
    basicSalary,
    allowances,
    deductions,
    tax,
    workedDays: attendanceData,
    leaveDays: leaveData[0]?.total || 0,
    generatedBy,
    notes,
  });

  return payroll.populate({ path: 'employee', populate: { path: 'user', select: 'firstName lastName email' } });
}

async function bulkGeneratePayroll(month, year, generatedBy) {
  const employees = await Employee.find({ status: 'active' });
  const results = [];

  for (const emp of employees) {
    try {
      const payroll = await generatePayroll({
        employeeId: emp._id,
        period: { month, year },
        basicSalary: emp.salary?.basic || 0,
      }, generatedBy);
      results.push({ status: 'success', employeeId: emp._id, payrollId: payroll._id });
    } catch (err) {
      results.push({ status: 'skipped', employeeId: emp._id, reason: err.message });
    }
  }

  return results;
}

async function getPayrolls(filters = {}, options = {}) {
  const query = {};
  if (filters.employeeId) query.employee = filters.employeeId;
  if (filters.status) query.status = filters.status;
  if (filters.month) query['period.month'] = parseInt(filters.month);
  if (filters.year) query['period.year'] = parseInt(filters.year);

  return paginate(Payroll, query, {
    ...options,
    populate: [{ path: 'employee', populate: { path: 'user', select: 'firstName lastName email' } }],
    sort: { 'period.year': -1, 'period.month': -1 },
  });
}

async function approvePayroll(id, approverId) {
  const payroll = await Payroll.findByIdAndUpdate(id, { status: 'approved', approvedBy: approverId }, { new: true });
  if (!payroll) { const e = new Error('Payroll not found'); e.statusCode = 404; throw e; }
  return payroll;
}

async function markPaid(id, paymentDate) {
  const payroll = await Payroll.findByIdAndUpdate(id, { status: 'paid', paymentDate: paymentDate || new Date() }, { new: true });
  if (!payroll) { const e = new Error('Payroll not found'); e.statusCode = 404; throw e; }
  return payroll;
}

async function getPayslip(id) {
  const payroll = await Payroll.findById(id)
    .populate({ path: 'employee', populate: [{ path: 'user', select: 'firstName lastName email' }, { path: 'department', select: 'name' }] })
    .populate('approvedBy', 'firstName lastName');
  if (!payroll) { const e = new Error('Payslip not found'); e.statusCode = 404; throw e; }
  return payroll;
}

module.exports = { generatePayroll, bulkGeneratePayroll, getPayrolls, approvePayroll, markPaid, getPayslip };
