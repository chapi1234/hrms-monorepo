const svc = require('./service');
const { success, created } = require('../../utils/apiResponse');
async function create(req, res, next) {
  try { created(res, await svc.createShift({ ...req.body, company: req.user.company })); } catch (e) { next(e); }
}
async function list(req, res, next) {
  try { success(res, await svc.getShifts(req.user.company)); } catch (e) { next(e); }
}
async function update(req, res, next) {
  try { success(res, await svc.updateShift(req.params.id, req.body), 'Shift updated'); } catch (e) { next(e); }
}
async function assign(req, res, next) {
  try { success(res, await svc.assignShift(req.params.id, req.body.employeeIds), 'Shift assigned'); } catch (e) { next(e); }
}
module.exports = { create, list, update, assign };
