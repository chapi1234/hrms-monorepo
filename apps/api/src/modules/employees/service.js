const User = require('../../models/User');
const Employee = require('../../models/Employee');
const Profile = require('../../models/Profile');
const { paginate } = require('../../utils/pagination');

async function createEmployee(data) {
  const { email, password = 'Hrms@1234', firstName, lastName, role = 'employee', company, ...empData } = data;

  // Create user account
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }

  const user = await User.create({ email, password, firstName, lastName, role, company });

  // Create employee record
  if (!empData.employeeId) {
    empData.employeeId = 'EMP-' + Math.floor(1000 + Math.random() * 9000);
  }
  const employee = await Employee.create({ user: user._id, company, ...empData });

  // Create empty profile
  await Profile.create({ employee: employee._id });

  return employee.populate([
    { path: 'user', select: 'firstName lastName email avatar' },
    { path: 'department', select: 'name code' },
  ]);
}

async function getEmployees(filters = {}, options = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.department) query.department = filters.department;
  if (filters.company) query.company = filters.company;
  if (filters.search) {
    // We'll use a case-insensitive match via populate — search on user names handled separately
  }
  if (filters.employmentType) query.employmentType = filters.employmentType;

  return paginate(Employee, query, {
    ...options,
    populate: [
      { path: 'user', select: 'firstName lastName email avatar lastLogin' },
      { path: 'department', select: 'name code' },
    ],
  });
}

async function getEmployeeById(id) {
  const employee = await Employee.findById(id)
    .populate('user', 'firstName lastName email avatar lastLogin isActive')
    .populate('department', 'name code')
    .populate('reportsTo')
    .populate('shift')
    .populate('profile');

  if (!employee) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  return employee;
}

async function updateEmployee(id, data) {
  const employee = await Employee.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('user', 'firstName lastName email avatar')
    .populate('department', 'name code');

  if (!employee) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  return employee;
}

async function terminateEmployee(id, terminationDate) {
  return Employee.findByIdAndUpdate(
    id,
    { status: 'terminated', terminationDate: terminationDate || new Date() },
    { new: true }
  );
}

async function deleteEmployee(id) {
  const employee = await Employee.findById(id);
  if (!employee) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  await User.findByIdAndDelete(employee.user);
  await Profile.findOneAndDelete({ employee: id });
  await employee.deleteOne();
}

async function getEmployeeStats(companyId) {
  const [total, active, onLeave, terminated, byDept] = await Promise.all([
    Employee.countDocuments({ company: companyId }),
    Employee.countDocuments({ company: companyId, status: 'active' }),
    Employee.countDocuments({ company: companyId, status: 'on-leave' }),
    Employee.countDocuments({ company: companyId, status: 'terminated' }),
    Employee.aggregate([
      { $match: { company: companyId ? require('mongoose').Types.ObjectId.createFromHexString(companyId) : { $exists: true } } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $limit: 10 },
    ]),
  ]);
  return { total, active, onLeave, terminated, byDepartment: byDept };
}

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, terminateEmployee, deleteEmployee, getEmployeeStats };
