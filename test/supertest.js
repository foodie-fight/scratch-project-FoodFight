const request = require('supertest');
// Start server
const app = require('../server.js');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;




describe('loginpage', () => {
  it('responds with 200 status and text/html content type', done => {
    request(HOST).get('/')
    .expect('Content-Type', /text\/html/)
    .expect(200, done);
  });

  describe('/logged', () => {
    it('response with 200 status and text/html content type', done => {
      request(HOST).get('/logged')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
      });
    });

    describe('/signup', () => {
      it('responds to valid request with 200 status and application/json content type', done => {
        request(HOST).get('/signup')
        .expect('Content-Type', /text\/html/)
        .expect(200, done);
      });
    });

    describe('/signup', () => {
      it('redirect to homepage after new user is created', done => {
        request(HOST).post('/signup')
        .expect(302)
        .expect('Location', '/')
        .end(done);
      });
    });

    describe('authentication', () => {
      describe ('success', () => {
        it ('redirects to the loggedpage', (done) => {
          request(HOST).post('/')
            .send({username:'username', password: 'password'})
            .expect(302)
            .expect('Location', '/logged')
            .end(done)  
          }); 
        });
      });
        
});
