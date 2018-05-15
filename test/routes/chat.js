const should = require('chai').should()
const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)
const statusCode = require('../../constants/status_code')

describe('Test Chat Routes', () => {
  // Test should pass if authorized and show conversation list
  it('Should show conversation list', (done) => {
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
            // Create a new conversation: user1 -> user2
            agent.post('/api/chat/new/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .send({'composedMessage': 'Test start new conversation!!!'})
              .end((err, res) => {
                if (err) return done(err)
                let resJson = JSON.parse(res.text)
                expect(resJson.message).to.equal('Conversation started!')
                expect(resJson.conversationId).to.be.exist
                agent.get('/api/chat')
                  .set('Authorization', 'Bearer ' + token)
                  .expect(statusCode.OK)
                  .end((err, res) => {
                    if (err) return done(err)
                    let resJson = JSON.parse(res.text)
                    expect(resJson.conversations).to.be.exist
                    done()
                  })
              })
          })
      })
  })

  // Test should pass if start a new conversation
  it('Should start new conversation', (done) => {
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
            // Create a new conversation: user1 -> user2
            agent.post('/api/chat/new/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .send({'composedMessage': 'Test start new conversation!!!'})
              .expect(statusCode.OK)
              .end((err, res) => {
                if (err) return done(err)
                let resJson = JSON.parse(res.text)
                expect(resJson.message).to.equal('Conversation started!')
                expect(resJson.conversationId).to.be.exist
                done()
              })
          })
      })
  })

  // Test should pass if do not start a new conversation without composedMessage
  it('Should do not start a new conversation without composedMessage', (done) => {
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
            // Create a new conversation: user1 -> user2
            agent.post('/api/chat/new/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .send({'composedMessage': ''})
              .expect(statusCode.UNPROCESSABLE_ENTITY)
              .end(done)
          })
      })
  })

  // // Test should pass if do not start a new conversation without recipient
  // it('Should do not start a new conversation without recipient', (done) => {
  //   // Create user1
  //   agent.get('/api/auth/register')
  //     .end((err, res) => {
  //       expect(err).to.not.exist
  //       let user1Info = JSON.parse(res.text)
  //       let token = user1Info.token
  //       // Create user2
  //       agent.get('/api/auth/register')
  //         .end((err, res) => {
  //           expect(err).to.not.exist
  //           let user2Info = JSON.parse(res.text)
  //           let user2Id = user2Info.user._id

  //           let req = {}
  //           req.params = {
  //             'recipient': ''
  //           }
  //           // Create a new conversation: user1 -> user2
  //           agent.post('/api/chat/new/' + null)
  //             .set('Authorization', 'Bearer ' + token)
  //             .send({'composedMessage': 'Test start new conversation!!!'})
  //             .expect(statusCode.UNPROCESSABLE_ENTITY)
  //             .end(done)
  //         })
  //     })
  // })

  // Test should pass if return one conversation with it's conversationId
  it('Should return an specify conversation', (done) => {
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
            // Create a new conversation: user1 -> user2
            agent.post('/api/chat/new/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .send({'composedMessage': 'Test start new conversation!!!'})
              .end((err, res) => {
                expect(err).to.not.exist
                let conversationInfo = JSON.parse(res.text)
                let conversationId = conversationInfo.conversationId
                // Get conversation with conversationId
                agent.get('/api/chat/' + conversationId)
                  .set('Authorization', 'Bearer ' + token)
                  .expect(statusCode.OK)
                  .end(done)
              })
          })
      })
  })

  // Test should pass if successfully sent a reply in specify conversation
  it('Should send reply in a specify conversation', (done) => {
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
            // Create a new conversation: user1 -> user2
            agent.post('/api/chat/new/' + user2Id)
              .set('Authorization', 'Bearer ' + token)
              .send({'composedMessage': 'Test start new conversation!!!'})
              .end((err, res) => {
                expect(err).to.not.exist
                let conversationInfo = JSON.parse(res.text)
                let conversationId = conversationInfo.conversationId
                // Send a reply to conversation
                agent.post('/api/chat/' + conversationId)
                  .set('Authorization', 'Bearer ' + token)
                  .send({'composedMessage': 'Test reply to conversation!!!'})
                  .expect(statusCode.OK)
                  .end(done)
              })
          })
      })
  })
})
