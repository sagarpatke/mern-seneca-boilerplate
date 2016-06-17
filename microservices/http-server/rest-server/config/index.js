var _ = require('lodash');

var common = {
  port: 3000
};

var env = process.env.NODE_ENV || 'dev';

exports = module.exports = _.merge(common, require('./environment/'+env));
