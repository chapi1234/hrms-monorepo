const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    checkIn: {
      time: { type: Date },
      location: { lat: Number, lng: Number },
      method: { type: String, enum: ['manual', 'qr', 'biometric', 'app'], default: 'app' },
    },
    checkOut: {
      time: { type: Date },
      location: { lat: Number, lng: Number },
      method: { type: String, enum: ['manual', 'qr', 'biometric', 'app'], default: 'app' },
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'half-day', 'weekend', 'holiday', 'on-leave'],
      default: 'absent',
    },
    totalHours: { type: Number, default: 0 }, // in hours
    overtime: { type: Number, default: 0 },
    notes: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isManualEntry: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compound index: one record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Auto-calculate total hours before save
attendanceSchema.pre('save', function (next) {
  if (this.checkIn?.time && this.checkOut?.time) {
    const diff = this.checkOut.time - this.checkIn.time;
    this.totalHours = parseFloat((diff / (1000 * 60 * 60)).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
