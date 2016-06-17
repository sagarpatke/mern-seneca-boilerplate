var should = require('should');

var seneca = require('seneca');

const baseMicroservice = seneca();
const accountMicroservice = seneca();
const consumerMicroservice = seneca();

const accountToCreate = {
  username: 'new-username',
  password: 'test-password'
};

describe('Setup', function() {
  it('Setup Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Setup Account Microservice', function(done) {
    accountMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/authentication-test'
    });

    accountMicroservice.use('mesh', {auto:true, pin: 'role:authentication,cmd:*'});

    accountMicroservice.ready(done);
  });

  it('Setup Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});

describe('Before', function() {
  it('Clear accounts table', function(done) {
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Create Account', function() {
  it('Create account', function(done) {
    consumerMicroservice.act('role:authentication,cmd:create', accountToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Create account with existing username', function(done) {
    consumerMicroservice.act('role:authentication,cmd:create', accountToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      done();
    });
  });
});

describe('Authenticate Account', function() {
  it('Authenticate account', function(done) {
    consumerMicroservice.act('role:authentication,cmd:authenticate', accountToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Authenticate account with invalid username', function(done) {
    const accountWithInvalidUsername = {
      username: Math.random()*2492319+'',
      password: accountToCreate.password
    }

    consumerMicroservice.act('role:authentication,cmd:authenticate', accountWithInvalidUsername, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      done();
    });
  });

  it('Authenticate account with invalid password', function(done) {
    const accountWithInvalidPassword = {
      username: accountToCreate.username,
      password: Math.random()*131123+''
    }

    consumerMicroservice.act('role:authentication,cmd:authenticate', accountWithInvalidPassword, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      done();
    });
  });

  it('Authenticate account with invalid username and password', function(done) {
    const accountWithInvalidUsernameAndPassword = {
      username: Math.random()*83183912+'',
      password: Math.random()*48283913+''
    }

    consumerMicroservice.act('role:authentication,cmd:authenticate', accountWithInvalidUsernameAndPassword, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      done();
    });
  });
});

describe('Change Password', function() {
  it('Change Password', function(done) {
    const passwordChangeRequest = {
      username: accountToCreate.username,
      oldPassword: accountToCreate.password,
      password: 'new-password'
    }

    consumerMicroservice.act('role:authentication,cmd:changePassword', passwordChangeRequest, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Change Password with wrong oldPassword', function(done) {
    const passwordChangeRequest = {
      username: accountToCreate.username,
      oldPassword: accountToCreate.password,
      password: 'new-password'
    }

    consumerMicroservice.act('role:authentication,cmd:changePassword', passwordChangeRequest, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      done();
    });
  });
});

describe('Delete Account', function() {
  it('Delete account', function(done) {
    consumerMicroservice.act('role:authentication,cmd:delete', accountToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Delete non-existant account', function(done) {
    consumerMicroservice.act('role:authentication,cmd:delete', accountToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Teardown', function() {
  it('consumerMicroservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('accountMicroservice', function(done) {
    accountMicroservice.close(done);
  });

  it('baseMicroservice', function(done) {
    baseMicroservice.close(done);
  });
});
