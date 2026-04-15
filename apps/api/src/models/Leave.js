const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number },
    reason: { type: String, maxlength: 500 },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },
    rejectionReason: { type: String },
    attachments: [String],
    isHalfDay: { type: Boolean, default: false },
    halfDayPeriod: { type: String, enum: ['morning', 'afternoon'] },
  },
  { timestamps: true }
);

// Auto-calculate total days before save
leaveSchema.pre('save', function (next) {
  if (this.startDate && this.endDate) {
    const diff = this.endDate - this.startDate;
    this.totalDays = this.isHalfDay ? 0.5 : Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }
  next();
});

leaveSchema.index({ employee: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Leave', leaveSchema);
