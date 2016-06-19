var seneca = require('seneca');

var mesh = seneca();
mesh.use('mesh',{auto:true});

var context = require('./context');
context.mesh = mesh;
context.authorizeMiddleware = function(req, res, next) {
  mesh.act('role:jwt,cmd:verify', {token: req.get('JWT')}, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response !== 'success') { return res.status(404).send(); }
    req.claims = response.claims;
    next();
  });
};

var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';

console.log('env is: ' + env);

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    next();
  });
};

app.use(require('body-parser').json());

app.use('/api/v1', require('./router'));

app.use(function(req, res) {
  return res.status(404).send();
});

exports = module.exports = app;
