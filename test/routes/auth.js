const should = require('chai').should()
const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)
const statusCode = require('../../constants/status_code')

describe('Test Authentication', () => {
  it("Should return 'Unauthorized' if unauthorized", (done) => {
    agent.get('/api/user')
      .expect(statusCode.UNAUTHORIZED)
      .end(() => {
        agent.get('/api/chat')
          .expect(statusCode.UNAUTHORIZED)
          .end(done)
      })
  })
})

describe('Test Auth Routes', () => {
  describe('Register', () => {
    it('Should register', (done) => {
      agent.get('/api/auth/register')
        .expect(statusCode.CREATED)
        .end(done)
    })
  })

  describe('Login', () => {
    // Test should pass if login successfull
    it('Should login', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let skyNumber = userInfo.user.skyNumber
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': skyNumber, 'token': token})
            .expect(statusCode.OK)
            .end(done)
        })
    })

    // Test should pass if can't login with wrong skyNumber
    it('Should not login with wrong skyNumber', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': '123123123', 'token': token})
            .expect(statusCode.UNAUTHORIZED)
            .end(done)
        })
    })

    // Test should pass if can't login with wrong token
    it('Should not login with wrong token', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let skyNumber = userInfo.user.skyNumber
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': skyNumber, 'token': 'token'})
            .expect(statusCode.UNAUTHORIZED)
            .end(done)
        })
    })

    // Test should pass if can't login without skyNumber
    it('Should not login without skyNumber', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': '', 'token': token})
            .expect(statusCode.BAD_REQUEST)
            .end(done)
        })
    })

    // Test should pass if can't login without token
    it('Should not login without token', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let skyNumber = userInfo.user.skyNumber
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': skyNumber, 'token': ''})
            .expect(statusCode.BAD_REQUEST)
            .end(done)
        })
    })

    // Test should pass if can't login without both skyNumber and token
    it('Should not login without both skyNumber and token', (done) => {
      agent.get('/api/auth/register')
        .end((err, res) => {
          expect(err).to.not.exist
          let userInfo = JSON.parse(res.text)
          let token = userInfo.token
          agent.post('/api/auth/login')
            .set('Authorization', 'Bearer ' + token)
            .type('form')
            .send({'skyNumber': '', 'token': ''})
            .expect(statusCode.BAD_REQUEST)
            .end(done)
        })
    })
  })
})
