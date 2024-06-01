const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  authProviderId: {
    type: String,
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
  delated_at: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model('User', UserSchema);
