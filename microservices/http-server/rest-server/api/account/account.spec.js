const should = require('should');
const request = require('supertest');
const seneca = require('seneca');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const knownAdmin = {
  username: 'admin',
  password: '5ivel!fe'
}

describe('Setup', function() {
  it('Start all microservices', function(done) {
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Delete all accounts', function(done) {
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
      if(err) { done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Accounts API', function() {
  it('Create account from API', function(done) {
    request(app)
    .post('/api/v1/account')
    .send(knownAdmin)
    .expect(201, done);
  });

  it('Retrieve JWT Token from API', function(done) {
    request(app)
    .post('/api/v1/authenticate')
    .send(knownAdmin)
    .expect(201, done);
  });
})

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
