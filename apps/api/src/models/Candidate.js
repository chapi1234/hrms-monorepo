const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    resumeUrl: { type: String },
    coverLetterUrl: { type: String },
    linkedinUrl: { type: String },
    portfolioUrl: { type: String },
    source: { type: String, enum: ['portal', 'linkedin', 'referral', 'agency', 'other'], default: 'portal' },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    stage: {
      type: String,
      enum: ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected', 'withdrawn'],
      default: 'applied',
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    expectedSalary: { type: Number },
    noticePeriod: { type: String },
    availableFrom: { type: Date },
    notes: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    tags: [String],
  },
  { timestamps: true }
);

candidateSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

candidateSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Candidate', candidateSchema);
