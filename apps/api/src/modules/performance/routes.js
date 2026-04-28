const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createReviewValidation, submitScoresValidation, createGoalValidation } = require('./validation');

router.use(authenticate);

// Reviews
router.get('/reviews', c.listReviews);
router.get('/reviews/:id', c.getReview);
router.post('/reviews', authorize('admin', 'hr'), createReviewValidation, validate, c.createReview);
router.put('/reviews/:id', authorize('admin', 'hr'), submitScoresValidation, validate, c.submitReview);
router.patch('/reviews/:id/acknowledge', c.acknowledgeReview);

// Goals
router.get('/goals', c.listGoals);
router.post('/goals', createGoalValidation, validate, c.createGoal);
router.put('/goals/:id', c.updateGoal);

module.exports = router;
