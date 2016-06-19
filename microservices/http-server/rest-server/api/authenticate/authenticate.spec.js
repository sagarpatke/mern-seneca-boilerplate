const should = require('should');
const request = require('supertest');
const seneca = require('seneca');
const base64 = require('base-64');

const app = require('../../app');

const consumerMicroservice = seneca();

const microservicesDecorator = require('../../start-microservices-decorator-for-testing');

const knownAdmin = {
  username: 'admin',
  password: '5ivel!fe'
}

describe('Setup', function() {
  it('Start All Microservices', function(done) {
    microservicesDecorator.startAllMicroservices(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });

  it('Delete all accounts', function(done) {
    consumerMicroservice.act('role:authentication,cmd:dangerouslyDeleteAllAccounts', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });

  it('Create known account', function(done) {
    consumerMicroservice.act('role:authentication,cmd:create',knownAdmin, function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});

describe('Authentication API', function() {
  it('Authenticate User', function(done) {
    request(app)
      .post('/api/v1/authenticate')
      .send(knownAdmin)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) { return done(err); }
        res.body.should.have.property('token');
        JSON.parse(base64.decode(res.body.token.split('.')[1])).sub.should.be.exactly(knownAdmin.username);
        done();
      });
  });
});

describe('Teardown', function() {
  it('Stop all microservices', function(done) {
    microservicesDecorator.stopAllMicroservices(done);
  });
});
