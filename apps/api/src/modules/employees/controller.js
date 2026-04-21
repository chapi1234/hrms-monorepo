const employeeService = require('./service');
const { success, created, paginated, notFound } = require('../../utils/apiResponse');

async function create(req, res, next) {
  try {
    const employee = await employeeService.createEmployee({ ...req.body, company: req.user.company });
    created(res, employee, 'Employee created successfully');
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { page, limit, sort, status, department, employmentType, search } = req.query;
    const result = await employeeService.getEmployees(
      { status, department, employmentType, search, company: req.user.company },
      { page, limit, sort }
    );
    paginated(res, result.data, result.pagination);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    success(res, employee);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    success(res, employee, 'Employee updated');
  } catch (err) { next(err); }
}

async function terminate(req, res, next) {
  try {
    const employee = await employeeService.terminateEmployee(req.params.id, req.body.terminationDate);
    success(res, employee, 'Employee terminated');
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await employeeService.deleteEmployee(req.params.id);
    success(res, null, 'Employee deleted');
  } catch (err) { next(err); }
}

async function stats(req, res, next) {
  try {
    const data = await employeeService.getEmployeeStats(req.user.company);
    success(res, data);
  } catch (err) { next(err); }
}

module.exports = { create, list, getById, update, terminate, remove, stats };
