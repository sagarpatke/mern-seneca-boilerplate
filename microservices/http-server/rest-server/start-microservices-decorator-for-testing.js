const seneca = require('seneca');
const async = require('async');

const decorator = {};
const env = process.env.NODE_ENV || 'dev';

const baseMicroservice = seneca();
const accountMicroservice = seneca();
const jwtMicroservice = seneca();
const consumerMicroservice = seneca();

decorator.startAllMicroservices = function(cb) {
  async.parallel({
    startBaseMicroservice: function(done) {
      baseMicroservice.use('mesh', {base: true});
      baseMicroservice.ready(done);
    },
    startAccountMicroservice: function(done) {
      accountMicroservice.use('account-microservice', {
        mongoUrl: 'mongodb://localhost:27017/boilerplate-'+env
      });
      accountMicroservice.use('mesh', {auto:true, pin:'role:authentication,cmd:*'});
      accountMicroservice.ready(done);
    },
    startJwtMicroservice: function(done) {
      jwtMicroservice.use('jwt-microservice',{secret: '48anp.hauec;u,tnh.p9'});
      jwtMicroservice.use('mesh', {auto:true, pin:'role:jwt,cmd:*'});
      jwtMicroservice.ready(done);
    }
  }, cb);
};

decorator.stopAllMicroservices = function(cb) {
  async.parallel({
    stopJwtMicroservice: function(done) {
      jwtMicroservice.close(done);
    },
    stopAccountMicroservice: function(done) {
      accountMicroservice.close(done);
    },
    stopBaseMicroservice: function(done) {
      baseMicroservice.close(done);
    }
  }, cb);
};

exports = module.exports = decorator;
