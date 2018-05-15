const should = require('chai').should()
const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)
const statusCode = require('../../constants/status_code')

describe('Test User Routes', () => {
  it('Should show user info', (done) => {
    agent.get('/api/auth/register')
      .end((err, res) => {
        expect(err).to.not.exist
        let userInfo = JSON.parse(res.text)
        let userId = userInfo.user._id
        let token = userInfo.token

        agent.get('/api/user/' + userId)
          .set('Authorization', 'Bearer ' + token)
          .expect(statusCode.OK)
          .end(done)
      })
  })

  it('Should not show user info if unauthorized', (done) => {
    // Create user1
    agent.get('/api/auth/register')
      .end((err, res) => {
        expect(err).to.not.exist
        let user1Info = JSON.parse(res.text)
        let token = user1Info.token
        // Create user2
        agent.get('/api/auth/register')
          .end((err, res) => {
            expect(err).to.not.exist
            let user2Info = JSON.parse(res.text)
            let user2Id = user2Info.user._id
            agent.get('/api/user/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .expect(statusCode.UNAUTHORIZED)
              .end(done)
          })
      })
  })
})
