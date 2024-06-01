const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  isRenovation: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
