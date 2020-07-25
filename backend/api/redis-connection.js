const redis = require('redis');

const clientRed = redis.createClient(6379, '127.0.0.1');

module.exports = clientRed;
