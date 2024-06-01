const { REQUIRED_FIELD } = require('../../../constants/errorMessage');
const logger = require('../../../lib/logger');
const Project = require('../../models/Project');

const getAllProjects = async () => {
  try {
    return await Project.where('delated_at').equals(null);
  } catch (error) {
    logger.error(error.toString());
  }
};

const getProjectById = async (id) => {
  try {
    return await Project.findById(id);
  } catch (error) {
    logger.error(error.toString());
  }
};

const addProject = async (project) => {
  try {
    return await Project.create(project);
  } catch (error) {
    logger.error(error.toString());
  }
};

const updateProject = async (project) => {
  try {
    if (!project.id) {
      return { error: REQUIRED_FIELD('Project ID') }
    }
    await Project.findById(project.id).updateOne(project);
    return project
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { getAllProjects, getProjectById, addProject, updateProject };
