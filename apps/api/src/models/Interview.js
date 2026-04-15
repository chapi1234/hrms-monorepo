const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    interviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 60 }, // minutes
    type: { type: String, enum: ['phone', 'video', 'in-person', 'technical', 'hr'], default: 'video' },
    round: { type: Number, default: 1 },
    location: { type: String },
    meetingLink: { type: String },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no-show'], default: 'scheduled' },
    result: { type: String, enum: ['pass', 'fail', 'hold', 'pending'], default: 'pending' },
    feedback: { type: String },
    scores: {
      technical: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      cultureFit: { type: Number, min: 1, max: 5 },
    },
    notes: { type: String },
    scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
