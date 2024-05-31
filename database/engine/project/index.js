const logger = require('../../../lib/logger');
const Project = require('../../models/project');

const addProject = async (project) => {
  try {
    return await Project.create(project);
  } catch (error) {
    logger.error(error.toString());
    console.log(error)
  }
};

module.exports = { addProject };
