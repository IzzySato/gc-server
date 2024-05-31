const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
