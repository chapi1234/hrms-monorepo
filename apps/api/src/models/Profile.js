const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, unique: true },
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
    nationality: { type: String },
    maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    emergencyContacts: [
      {
        name: { type: String, required: true },
        relationship: { type: String },
        phone: { type: String, required: true },
        email: String,
      },
    ],
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      routingNumber: String,
    },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
