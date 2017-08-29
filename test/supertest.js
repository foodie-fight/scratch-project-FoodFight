const request = require('supertest');
// Start server
const app = require('../server.js');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;




describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', done => {
        request(HOST)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  });

  describe('/logged', () => {
    describe('GET', () => {
      it('response with 200 status and text/html content type', done => {
        request(HOST)
        .get('/logged')
        .expect('Content-Type', /text\/html/)
        .expect(200, done);
      });
    });

    describe('POST', () => {
      it('responds to valid request with 200 status and application/json content type', done => {
        request(HOST)
        .post('/logged')
        // .send({ winner: 'X' })
        .expect('Content-Type', /text\/html/)
        .expect(200, done);
      });
    });

      describe('POST', () => {
        it('responds to valid request with 200 status and application/json content type', done => {
          request(HOST)
          .post('/signup')
          // .send({ winner: 'X' })
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
        });
    });
  });
});
