const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  type: {
    type: String, // e.g. new, reno, or reno/new
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  uerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  delated_at: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
