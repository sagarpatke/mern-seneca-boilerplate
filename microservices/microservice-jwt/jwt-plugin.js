var jwt = require('jsonwebtoken');
var _ = require('lodash');

exports = module.exports = function(options) {
  var secret = options.secret;

  this.add('role:jwt,cmd:generate', function(msg, respond) {
    this.act('role:authentication,cmd:authenticate', msg, function(err, response) {
      if(err) { return respond(err); }
      if(!response.hasOwnProperty('response') || response.response !== 'success') { return respond(null, {response: 'fail'}); }
      return jwt.sign({}, secret, { subject: msg.username }, function(err, token) {
        if(err) { return respond(err); }
        return respond(null, {token, response: 'success'});
      });
    });
  });

  this.add('role:jwt,cmd:verify', function(msg, respond) {
    var options = {
      clockTolerance: 30
    };

    return jwt.verify(msg.token, secret, _.merge(options,msg.options), function(err, claims) {
      if(err || !claims) { return respond(null, {response: 'fail'}); }
      return respond(null, {response: 'success', claims});
    });
  });
};
