// ✅ FILE: backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 🔽 Additional fields for profile
  role: { type: String, default: 'Faculty' },
  department: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  isMentor: { type: Boolean, default: false },
  subjects: { type: Object, default: {} },
  profilePicture: { type: String, default: '' },
  lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
