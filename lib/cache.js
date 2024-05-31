'use strict';

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const logger = require('./logger');
const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;

const redisWrapper = async (exec) => {
  try {
    client.on('error', (err) => logger.error('Redis Client Error', err));
    await client.connect();
    return await exec();
  } catch (error) {
    logger.error(error.toString());
  } finally {
    await client.disconnect();
  }
};

mongoose.Query.prototype.cache = function (id = '') {
  this.isCache = true;
  this.key = id;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.isCache) {
    logger.info('not cache');
    return exec.apply(this, arguments);
  }
  return await redisWrapper(async () => {
    const field = JSON.stringify(Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    }));
    // Check the key in redis
    const cacheValue = await client.hGet(this.key, field);
    if (cacheValue) {
      logger.info(`key: ${this.key} cache is returned`);
      const doc = JSON.parse(cacheValue);
      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    }
    logger.info(`key: ${this.key} store the value in cache`);
    // Store the result in redis
    const result = await exec.apply(this, arguments);
    await client.hSet(this.key, field, JSON.stringify(result));
    return result;
  });
};

const clearHash = async (key) => {
  redisWrapper(async () => {
    await client.del(JSON.stringify(key));
  });
};

module.exports = { clearHash };
