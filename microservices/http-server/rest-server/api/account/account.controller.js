var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.createAccount = function(req, res) {
  mesh.act('role:authentication,cmd:create', req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(409).send(); }
    return res.status(201).send();
  });
};

exports = module.exports = controller;
