const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true, uppercase: true },
    description: { type: String },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    budget: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

departmentSchema.virtual('headcountInfo', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'department',
  count: true,
});

module.exports = mongoose.model('Department', departmentSchema);
