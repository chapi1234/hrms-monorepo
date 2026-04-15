const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    audience: {
      type: String,
      enum: ['all', 'admin', 'hr', 'employees', 'department'],
      default: 'all',
    },
    targetDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
    isPinned: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    expiresAt: { type: Date },
    attachments: [String],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

announcementSchema.index({ company: 1, isPublished: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
