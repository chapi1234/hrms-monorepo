const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    permissions: [
      {
        resource: { type: String, required: true }, // e.g. 'employees', 'payroll'
        actions: [{ type: String, enum: ['read', 'create', 'update', 'delete', 'approve', 'export'] }],
      },
    ],
    isSystem: { type: Boolean, default: false }, // system roles can't be deleted
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
