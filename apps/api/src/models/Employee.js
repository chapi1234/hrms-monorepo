const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    position: { type: String, required: true, trim: true },
    reportsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    hireDate: { type: Date, required: true },
    terminationDate: { type: Date },
    employmentType: { type: String, enum: ['full-time', 'part-time', 'contract', 'intern'], default: 'full-time' },
    status: { type: String, enum: ['active', 'inactive', 'on-leave', 'terminated'], default: 'active' },
    salary: {
      basic: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      paymentFrequency: { type: String, enum: ['monthly', 'bi-weekly', 'weekly'], default: 'monthly' },
    },
    shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift' },
    skills: [String],
    tags: [String],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

employeeSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'employee',
  justOne: true,
});

module.exports = mongoose.model('Employee', employeeSchema);
