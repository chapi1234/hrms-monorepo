const svc = require('./service');
const Employee = require('../../models/Employee');
const { success, created, paginated } = require('../../utils/apiResponse');

async function createReview(req, res, next) {
  try { created(res, await svc.createReview(req.body, req.user._id)); } catch (e) { next(e); }
}
async function listReviews(req, res, next) {
  try {
    let filters = req.query;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      filters = { ...filters, employee: emp?._id };
    }
    const r = await svc.getReviews(filters, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}
async function getReview(req, res, next) {
  try { success(res, await svc.getReviewById(req.params.id)); } catch (e) { next(e); }
}
async function submitReview(req, res, next) {
  try { success(res, await svc.submitReview(req.params.id, req.body), 'Review submitted'); } catch (e) { next(e); }
}
async function acknowledgeReview(req, res, next) {
  try { success(res, await svc.acknowledgeReview(req.params.id, req.body.employeeComments), 'Review acknowledged'); } catch (e) { next(e); }
}

// Goals
async function createGoal(req, res, next) {
  try { created(res, await svc.createGoal(req.body, req.user._id)); } catch (e) { next(e); }
}
async function listGoals(req, res, next) {
  try {
    let empId = req.query.employeeId;
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ user: req.user._id });
      empId = emp?._id;
    }
    const r = await svc.getGoals(empId, req.query);
    paginated(res, r.data, r.pagination);
  } catch (e) { next(e); }
}
async function updateGoal(req, res, next) {
  try { success(res, await svc.updateGoal(req.params.id, req.body), 'Goal updated'); } catch (e) { next(e); }
}

module.exports = { createReview, listReviews, getReview, submitReview, acknowledgeReview, createGoal, listGoals, updateGoal };
