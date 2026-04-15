const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, uppercase: true, trim: true },
    startTime: { type: String, required: true }, // HH:MM format
    endTime: { type: String, required: true },
    breakDuration: { type: Number, default: 60 }, // minutes
    workingDays: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    color: { type: String, default: '#2563EB' },
    isActive: { type: Boolean, default: true },
    isFlexible: { type: Boolean, default: false },
    graceTimeIn: { type: Number, default: 15 }, // minutes
    graceTimeOut: { type: Number, default: 15 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shift', shiftSchema);
