const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['attendance', 'payroll', 'leave', 'performance', 'recruitment', 'headcount', 'custom'],
      required: true,
    },
    parameters: { type: mongoose.Schema.Types.Mixed }, // filter options used to generate
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    fileUrl: { type: String },
    format: { type: String, enum: ['csv', 'pdf', 'xlsx'], default: 'csv' },
    status: { type: String, enum: ['pending', 'generating', 'ready', 'failed'], default: 'pending' },
    size: { type: Number }, // bytes
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
