const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    period: {
      month: { type: Number, required: true, min: 1, max: 12 },
      year: { type: Number, required: true },
    },
    basicSalary: { type: Number, required: true },
    allowances: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    deductions: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    tax: { type: Number, default: 0 },
    grossPay: { type: Number },
    netPay: { type: Number },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['draft', 'pending', 'approved', 'paid'], default: 'draft' },
    paymentDate: { type: Date },
    paymentMethod: { type: String, enum: ['bank-transfer', 'cash', 'cheque'], default: 'bank-transfer' },
    workedDays: { type: Number },
    leaveDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
    overtimeAmount: { type: Number, default: 0 },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    payslipUrl: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// Compound unique index: one payroll per employee per period
payrollSchema.index({ employee: 1, 'period.month': 1, 'period.year': 1 }, { unique: true });

// Auto-calculate gross and net pay
payrollSchema.pre('save', function (next) {
  const totalAllowances = (this.allowances || []).reduce((sum, a) => sum + a.amount, 0);
  const totalDeductions = (this.deductions || []).reduce((sum, d) => sum + d.amount, 0);
  this.grossPay = this.basicSalary + totalAllowances + this.overtimeAmount;
  this.netPay = this.grossPay - totalDeductions - this.tax;
  next();
});

module.exports = mongoose.model('Payroll', payrollSchema);
