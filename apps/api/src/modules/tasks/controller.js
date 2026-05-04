const svc = require('./service');
const Employee = require('../../models/Employee');
const { success, created, paginated } = require('../../utils/apiResponse');

async function create(req, res, next) {
  try { created(res, await svc.createTask(req.body, req.user._id), 'Task created'); } catch (e) { next(e); }
}
async function list(req, res, next) {
  try {
    let filters = req.query;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      filters = { ...filters, assignee: emp?._id };
    }
    const r = await svc.getTasks(filters, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}
async function getById(req, res, next) {
  try { success(res, await svc.getTaskById(req.params.id)); } catch (e) { next(e); }
}
async function update(req, res, next) {
  try { success(res, await svc.updateTask(req.params.id, req.body, req.user._id), 'Task updated'); } catch (e) { next(e); }
}
async function addComment(req, res, next) {
  try { success(res, await svc.addComment(req.params.id, req.user._id, req.body.text), 'Comment added'); } catch (e) { next(e); }
}
async function remove(req, res, next) {
  try { await svc.deleteTask(req.params.id); success(res, null, 'Task deleted'); } catch (e) { next(e); }
}

module.exports = { create, list, getById, update, addComment, remove };
