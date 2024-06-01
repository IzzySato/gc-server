const logger = require('../../../lib/logger');
const User = require('../../models/user');

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    logger.error(error.toString());
  }
};

const addUser = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { addUser, getUserById };
