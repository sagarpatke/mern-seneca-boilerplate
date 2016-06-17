var seneca = require('seneca');

var microservice = seneca();

microservice.use('mesh',{auto:true});

microservice.act('role:authentication,cmd:create',{username:'admin',password:'admin'}, function(err, res) {
  if(err) { return console.errr(err); }
  return console.log('RES: ', res);
});
