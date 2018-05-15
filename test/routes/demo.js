// const should = require('chai').should()
// const expect = require('chai').expect
// const request = require('supertest')
// const app = require('../../app')
// const agent = request.agent(app)
// const statusCode = require('../../constants/status_code')

// // Test should pass if return 10 messages older than the createAt time sent
// describe('Test loadMessagesWithTime function', () => {
//   it('loadMessagesWithTime function will run correctly', (done) => {
//     let token, conversationId, conversation1, conversation2
//     // Create user1
//     agent.get('/api/auth/register')
//       .end((err, res) => {
//         expect(err).to.not.exist
//         let user1Info = JSON.parse(res.text)
//         token = user1Info.token
//         // Create user2
//         agent.get('/api/auth/register')
//           .end((err, res) => {
//             expect(err).to.not.exist
//             let user2Info = JSON.parse(res.text)
//             let user2Id = user2Info.user._id
//             // Create a new conversation: user1 -> user2
//             agent.post('/api/chat/new/' + user2Id)
//               .set('Authorization', 'Bearer ' + token)
//               .send({'composedMessage': 'Test start new conversation!!!'})
//               .end((err, res) => {
//                 expect(err).to.not.exist
//                 let conversationInfo = JSON.parse(res.text)
//                 conversationId = conversationInfo.conversationId
//                 // Send a reply to conversation
//                 for (let i = 0; i < 20; i++) {
//                   agent.post('/api/chat/' + conversationId)
//                     .set('Authorization', 'Bearer ' + token)
//                     .send({'composedMessage': 'Test reply to conversation!!!'})
//                     .expect(statusCode.OK)
//                     .end((err, res) => {
//                       expect(err).to.not.exist
//                       conversation1 = JSON.parse(res.text).conversation
//                       agent.get('/api/chat/' + conversationId)
//                         .set('Authorization', 'Bearer ' + token)
//                         .expect(statusCode.OK)
//                         .expect(conversation1).to.exist
//                         .end()
//                     })
//                 }
//                 let time = conversation1[9].createdAt
//                 console.log(time)
//                 agent.get('/api/chat/' + conversationId + '/' + time)
//                   .set('Authorization', 'Bearer ' + token)
//                   .expect(statusCode.OK)
//                   .end((err, res) => {
//                     expect(err).to.not.exist
//                     conversation2 = JSON.parse(res.text).conversation
//                     expect(conversation2).to.not.equal(conversation1)
//                     done()
//                   })
//               })
//           })
//       })
//   })
// })
