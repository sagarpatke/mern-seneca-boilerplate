var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.createToken = function(req, res) {
  mesh.act('role:jwt,cmd:generate', req.body, function(err, response) {
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }
    return res.status(201).json({token: response.token});
  });
};

exports = module.exports = controller;
