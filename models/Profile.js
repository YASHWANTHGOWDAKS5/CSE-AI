const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  subjects: { type: Object, default: {} },
});

module.exports = mongoose.model('Profile', profileSchema);
