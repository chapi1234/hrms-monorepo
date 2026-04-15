const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    description: { type: String },
    requirements: { type: String },
    responsibilities: { type: String },
    type: { type: String, enum: ['full-time', 'part-time', 'contract', 'intern'], default: 'full-time' },
    location: { type: String },
    isRemote: { type: Boolean, default: false },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'USD' },
    },
    status: { type: String, enum: ['draft', 'open', 'closed', 'on-hold'], default: 'draft' },
    openings: { type: Number, default: 1 },
    deadline: { type: Date },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [String],
    experience: { type: String },
    education: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
