const svc = require('./service');
const { success, created, paginated } = require('../../utils/apiResponse');

async function create(req, res, next) {
  try { created(res, await svc.createDepartment({ ...req.body, company: req.user.company })); } catch (e) { next(e); }
}
async function list(req, res, next) {
  try {
    const r = await svc.getDepartments(req.user.company, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}
async function getById(req, res, next) {
  try { success(res, await svc.getDepartmentById(req.params.id)); } catch (e) { next(e); }
}
async function update(req, res, next) {
  try { success(res, await svc.updateDepartment(req.params.id, req.body), 'Department updated'); } catch (e) { next(e); }
}
async function remove(req, res, next) {
  try { await svc.deleteDepartment(req.params.id); success(res, null, 'Department deleted'); } catch (e) { next(e); }
}
async function headcount(req, res, next) {
  try { success(res, await svc.getDepartmentHeadcount(req.user.company)); } catch (e) { next(e); }
}

module.exports = { create, list, getById, update, remove, headcount };
