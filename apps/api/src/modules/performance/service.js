const PerformanceReview = require('../../models/PerformanceReview');
const Goal = require('../../models/Goal');
const Employee = require('../../models/Employee');
const { paginate } = require('../../utils/pagination');

async function createReview(data, reviewerId) {
  return PerformanceReview.create({ ...data, reviewer: reviewerId });
}

async function getReviews(filters = {}, options = {}) {
  const q = {};
  if (filters.employee) q.employee = filters.employee;
  if (filters.status) q.status = filters.status;
  if (filters.period) q.period = filters.period;
  return paginate(PerformanceReview, q, {
    ...options,
    populate: [
      { path: 'employee', populate: { path: 'user', select: 'firstName lastName avatar' } },
      { path: 'reviewer', select: 'firstName lastName' },
    ],
    sort: { reviewDate: -1 },
  });
}

async function getReviewById(id) {
  const r = await PerformanceReview.findById(id)
    .populate({ path: 'employee', populate: { path: 'user', select: 'firstName lastName avatar' } })
    .populate('reviewer', 'firstName lastName')
    .populate('goals');
  if (!r) { const e = new Error('Review not found'); e.statusCode = 404; throw e; }
  return r;
}

async function submitReview(id, data) {
  const r = await PerformanceReview.findByIdAndUpdate(id, { ...data, status: 'submitted' }, { new: true, runValidators: true });
  if (!r) { const e = new Error('Review not found'); e.statusCode = 404; throw e; }
  return r;
}

async function acknowledgeReview(id, employeeComment) {
  return PerformanceReview.findByIdAndUpdate(id, {
    status: 'acknowledged',
    employeeComments: employeeComment,
    acknowledgedAt: new Date(),
  }, { new: true });
}

// Goals
async function createGoal(data, userId) {
  const emp = await Employee.findOne({ user: userId });
  return Goal.create({ ...data, employee: emp?._id || data.employee });
}

async function getGoals(employeeId, options = {}) {
  return paginate(Goal, employeeId ? { employee: employeeId } : {}, { ...options, sort: { dueDate: 1 } });
}

async function updateGoal(id, data) {
  if (data.progress === 100) data.status = 'completed';
  const g = await Goal.findByIdAndUpdate(id, data, { new: true });
  if (!g) { const e = new Error('Goal not found'); e.statusCode = 404; throw e; }
  return g;
}

module.exports = { createReview, getReviews, getReviewById, submitReview, acknowledgeReview, createGoal, getGoals, updateGoal };
