const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    period: {
      type: String,
      enum: ['quarterly', 'bi-annual', 'annual'],
      default: 'annual',
    },
    reviewDate: { type: Date, required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ['draft', 'submitted', 'acknowledged', 'completed'], default: 'draft' },
    scores: {
      productivity: { type: Number, min: 1, max: 5 },
      quality: { type: Number, min: 1, max: 5 },
      teamwork: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      initiative: { type: Number, min: 1, max: 5 },
      punctuality: { type: Number, min: 1, max: 5 },
    },
    overallScore: { type: Number, min: 1, max: 5 },
    strengths: { type: String },
    areasForImprovement: { type: String },
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
    reviewerComments: { type: String },
    employeeComments: { type: String },
    acknowledgedAt: { type: Date },
    rating: { type: String, enum: ['exceptional', 'exceeds-expectations', 'meets-expectations', 'needs-improvement', 'unsatisfactory'] },
  },
  { timestamps: true }
);

// Auto-calculate overall score
performanceReviewSchema.pre('save', function (next) {
  const { scores } = this;
  const vals = Object.values(scores).filter(Boolean);
  if (vals.length) {
    this.overallScore = parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
