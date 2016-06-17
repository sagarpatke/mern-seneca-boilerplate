var seneca = require('seneca');

var jwtMicroservice = seneca();
jwtMicroservice.use('.',{secret:'8903409aphaseth;p,.as;;p'});
jwtMicroservice.use('mesh', {auto:true, pin: 'role:jwt,cmd:*'});
