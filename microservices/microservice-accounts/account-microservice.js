var seneca = require('seneca');

var accountMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

accountMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
accountMicroservice.use('mesh', {auto:true, pin: 'role:authentication,cmd:*'});
