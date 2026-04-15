const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, enum: ['performance', 'learning', 'career', 'personal'], default: 'performance' },
    target: { type: String },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ['not-started', 'in-progress', 'completed', 'cancelled'], default: 'not-started' },
    dueDate: { type: Date },
    completedAt: { type: Date },
    reviewCycle: { type: String },
    linkedReview: { type: mongoose.Schema.Types.ObjectId, ref: 'PerformanceReview' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
