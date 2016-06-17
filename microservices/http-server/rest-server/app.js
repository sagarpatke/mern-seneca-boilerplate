var seneca = require('seneca');

var mesh = seneca();
mesh.use('mesh',{auto:true});

var context = require('./context');
context.mesh = mesh;

var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'dev';

app.use(express.static(__dirname + '/../common-ui'));

if(env === 'dev') {
  app.use(require('cors')());
};

app.use(require('body-parser').json());

// TODO: Verify JWT Token

app.use('/api/v1', require('./router'));

app.use(function(req, res) {
  return res.status(404).send();
});

exports = module.exports = app;
