const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['contract', 'id', 'certificate', 'tax', 'bank', 'appraisal', 'offer-letter', 'other'],
      default: 'other',
    },
    fileUrl: { type: String, required: true },
    fileName: { type: String },
    fileSize: { type: Number },
    mimeType: { type: String },
    isConfidential: { type: Boolean, default: false },
    expiresAt: { type: Date },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    description: { type: String },
  },
  { timestamps: true }
);

documentSchema.index({ employee: 1, type: 1 });

module.exports = mongoose.model('Document', documentSchema);
