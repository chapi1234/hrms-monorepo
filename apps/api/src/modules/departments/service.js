const Department = require('../../models/Department');
const Employee = require('../../models/Employee');
const { paginate } = require('../../utils/pagination');

async function createDepartment(data) {
  const dept = await Department.create(data);
  return dept.populate('head', 'firstName lastName email');
}

async function getDepartments(companyId, options = {}) {
  return paginate(Department, { company: companyId }, {
    ...options,
    populate: [{ path: 'head', select: 'firstName lastName email' }],
  });
}

async function getDepartmentById(id) {
  const dept = await Department.findById(id)
    .populate('head', 'firstName lastName email')
    .populate('parentDepartment', 'name');
  if (!dept) { const e = new Error('Department not found'); e.statusCode = 404; throw e; }
  return dept;
}

async function updateDepartment(id, data) {
  const dept = await Department.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate('head', 'firstName lastName email');
  if (!dept) { const e = new Error('Department not found'); e.statusCode = 404; throw e; }
  return dept;
}

async function deleteDepartment(id) {
  const headcount = await Employee.countDocuments({ department: id, status: { $ne: 'terminated' } });
  if (headcount > 0) {
    const e = new Error('Cannot delete department with active employees');
    e.statusCode = 409;
    throw e;
  }
  await Department.findByIdAndDelete(id);
}

async function getDepartmentHeadcount(companyId) {
  return Department.aggregate([
    { $match: { company: companyId ? require('mongoose').Types.ObjectId.createFromHexString(String(companyId)) : { $exists: true } } },
    {
      $lookup: {
        from: 'employees', localField: '_id', foreignField: 'department',
        as: 'employees', pipeline: [{ $match: { status: 'active' } }],
      },
    },
    { $project: { name: 1, code: 1, headcount: { $size: '$employees' } } },
  ]);
}

module.exports = { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment, getDepartmentHeadcount };
