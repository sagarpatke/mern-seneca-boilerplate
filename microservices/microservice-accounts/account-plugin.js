var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var AccountSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }
});

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  function hashPassword(password, callback) {
    return bcrypt.hash(password, 10, callback);
  }

  function verifyPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback);
  }

  const Account = connection.model('Account', AccountSchema);

  this.add('role:authentication,cmd:create', function(msg, respond) {
    return Account.find({username: msg.username}, function(err, retrievedAccounts) {
      if(err) { return respond(err); }
      if(retrievedAccounts.length > 0) { return respond(null, {response: 'fail'}); }
      return hashPassword(msg.password, function(err, hash) {
        msg.password = hash;
        if(err) { return respond(err); }
        return Account.create(msg, function(err, createdAccount) {
          if(err) { return respond(err); }
          return respond(null, {response: 'success'});
        });
      });
    });
  });

  this.add('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(msg, respond) {
    return Account.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:authentication,cmd:authenticate', function(msg, respond) {
    return Account.find({username: msg.username}, function(err, retrievedAccount) {
      if(err) { return respond(err); }
      if(retrievedAccount.length === 0) { return respond(null,{response:'fail'}); }

      return verifyPassword(msg.password, retrievedAccount[0].password, function(err, res) {
        if(err) { return respond(err); }
        return respond(null, {response: res ? 'success' : 'fail'});
      });
    });
  });

  this.add('role:authentication,cmd:delete', function(msg, respond) {
    return Account.remove({username:msg.username}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:authentication,cmd:changePassword', function(msg, respond) {
    return Account.find({username: msg.username}, function(err, retrievedAccounts) {
      if(err) { return respond(err); }
      if(retrievedAccounts.length === 0) { return respond(null, {response: 'fail'}); }
      verifyPassword(msg.oldPassword,retrievedAccounts[0].password, function(err, res) {
        if(err) { return respond(err); }
        if(!res) { return respond(null, {response: 'fail'}); }
        hashPassword(msg.password,function(err, hash) {
          if(err) { return respond(err); }
          retrievedAccounts[0].password = hash;
          retrievedAccounts[0].save(function(err, updatedAccount) {
            if(err) { return respond(err); }
            return respond(null, {response: 'success'});
          });
        });
      });
    });
  });

  // Create default account if none exists:
  Account.find({}, function(err, retrievedAccounts) {
    console.log('Creating default account if none exists!');
    if(err) { console.error('Error querying MongoDB'); process.exit(-1); }
    if(retrievedAccounts.length === 0) {
      this.act('role:authentication,cmd:create', {username: 'admin', password: '5ivel!fe'}, function(err, response) {
        if(err) { console.log('Could not create root account!'); process.exit(-1); }
        console.log('Created Default Admin Account');
      });
    }
  }.bind(this));
};
