const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    logo: { type: String },
    industry: { type: String },
    size: { type: String, enum: ['1-10', '11-50', '51-200', '201-500', '500+'] },
    website: { type: String },
    phone: { type: String },
    email: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    settings: {
      workingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
      workingHours: { start: { type: String, default: '09:00' }, end: { type: String, default: '18:00' } },
      timezone: { type: String, default: 'UTC' },
      currency: { type: String, default: 'USD' },
      fiscalYearStart: { type: String, default: '01-01' },
    },
    isActive: { type: Boolean, default: true },
    subscription: {
      plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
