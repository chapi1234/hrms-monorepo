const svc = require('./service');
const Employee = require('../../models/Employee');
const { success, created, paginated } = require('../../utils/apiResponse');

async function generate(req, res, next) {
  try { created(res, await svc.generatePayroll(req.body, req.user._id), 'Payroll generated'); } catch (e) { next(e); }
}
async function bulkGenerate(req, res, next) {
  try { success(res, await svc.bulkGeneratePayroll(req.body.month, req.body.year, req.user._id), 'Bulk payroll generated'); } catch (e) { next(e); }
}
async function list(req, res, next) {
  try {
    let filters = req.query;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      filters = { ...filters, employeeId: emp?._id };
    }
    const r = await svc.getPayrolls(filters, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}
async function approve(req, res, next) {
  try { success(res, await svc.approvePayroll(req.params.id, req.user._id), 'Payroll approved'); } catch (e) { next(e); }
}
async function paid(req, res, next) {
  try { success(res, await svc.markPaid(req.params.id, req.body.paymentDate), 'Payroll marked as paid'); } catch (e) { next(e); }
}
async function payslip(req, res, next) {
  try { success(res, await svc.getPayslip(req.params.id)); } catch (e) { next(e); }
}

module.exports = { generate, bulkGenerate, list, approve, paid, payslip };
