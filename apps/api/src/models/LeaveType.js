const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    maxDaysPerYear: { type: Number, required: true },
    carryOverAllowed: { type: Boolean, default: false },
    maxCarryOverDays: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: true },
    requiresApproval: { type: Boolean, default: true },
    minNoticeDays: { type: Number, default: 0 },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isActive: { type: Boolean, default: true },
    color: { type: String, default: '#2563EB' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
