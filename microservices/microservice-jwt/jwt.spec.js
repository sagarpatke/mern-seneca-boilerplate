var should = require('should');
var seneca = require('seneca');

const baseMicroservice = seneca();
const accountMicroservice = seneca();
const jwtMicroservice = seneca();
const consumerMicroservice = seneca();

const userToCreate = {
  username: 'my-username',
  password: 'my-password'
}

describe('Setup', function(done) {
  it('Base Microservice', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Account Microservice', function(done) {
    accountMicroservice.use('account-microservice', {
      mongoUrl: 'mongodb://localhost:27017/authentication-test'
    });
    accountMicroservice.use('mesh', {auto:true, pin:'role:authentication,cmd:*'});
    accountMicroservice.ready(done);
  });

  it('JWT Microservice', function(done) {
    jwtMicroservice.use('.',{secret:'8903409aphas;;p'});
    jwtMicroservice.use('mesh', {auto:true, pin: 'role:jwt,cmd:*'});
    jwtMicroservice.ready(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh', {auto:true});
    consumerMicroservice.ready(done);
  });

  it('Delete all user accounts', function(done) {
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Create user', function(done) {
    consumerMicroservice.act('role:authentication,cmd:create', userToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('JWT Token Microservice', function() {
  var generatedToken;

  it('Fail to generate JWT Token with wrong user credentials', function(done) {
    const wrongUsername = {
      username: 'wrong-username',
      password: userToCreate.password
    }

    consumerMicroservice.act('role:jwt,cmd:generate', wrongUsername, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      response.should.not.have.property('token');
      done();
    });
  });

  it('Generate JWT Token', function(done) {
    consumerMicroservice.act('role:jwt,cmd:generate', userToCreate, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('token');
      generatedToken = response.token;
      console.log('token: ' + generatedToken);
      done();
    });
  });

  it('Verify JWT Token', function(done) {
    consumerMicroservice.act('role:jwt,cmd:verify', {token: generatedToken}, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('claims');
      response.claims.sub.should.be.exactly(userToCreate.username);
      done();
    });
  });

  it('Tamper JWT Token', function(done) {
    consumerMicroservice.act('role:jwt,cmd:verify', {token: generatedToken.replace('a','b')}, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('fail');
      response.should.not.have.property('claims');
      done();
    });
  });
});

describe('Teardown', function() {
  it('Consumer Microservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('JWT Microservice', function(done) {
    jwtMicroservice.close(done);
  });

  it('Account Microservice', function(done) {
    accountMicroservice.close(done);
  });

  it('Base Microservice', function(done) {
    baseMicroservice.close(done);
  });
});
