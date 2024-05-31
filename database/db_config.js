const mongoose = require('mongoose');
const logger = require('../lib/logger');

const dbConnect = () => {
  try {
    mongoose.connect(process.env.URI);
    const db = mongoose.connection;
    db.on('error', (error) => logger.error(error.toString()));
    db.once('open', () => logger.info('Connect to Database'));
  } catch (err) {
    logger.error(err.toString());
    throw err;
  }
};

module.exports = { dbConnect };
