const logger = require('../../../lib/logger');
const User = require('../../models/User');

const findOrCreate = ({ id, name: { familyName, givenName }, emails }) => {
  try {
    const user = User.findOne({ email: emails[0].value });
    if (user) {
      return user;
    } else {
      User.create({
        firstName: givenName,
        lastName: familyName,
        email: emails[0].value,
        authProviderId: id,
      });
    }
  } catch (error) {
    logger.error(error.toString());
  }
};

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

module.exports = { addUser, getUserById, findOrCreate };
