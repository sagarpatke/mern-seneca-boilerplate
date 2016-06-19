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

controller.changePassword = function(req, res) {
  if(!req.body.oldPassword || !req.body.password) { console.log('HERE'); return res.status(404).send(); }
  const changePasswordRequest = req.body;
  changePasswordRequest.username = req.claims.sub;
  console.log('===== ATTEMPTING CHANGE PASSWORD =====: ', changePasswordRequest);
  mesh.act('role:authentication,cmd:changePassword', changePasswordRequest, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { console.log('HERE2: ', response); return res.status(404).send(); }
    return res.status(200).send();
  });
};

exports = module.exports = controller;
