// require('rootpath')

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const Conversation = require('../../../models/conversation')

// describe('Create new conversation', () => {
//   let recipient, composedMessage, _id, chatControllers, req, res, db, conversationId

//   before((done) => {
//     // Fill your db dummy return object
//     recipient = '5aeb6ed863c6fb16a64d3612'
//     _id = '5aeb6ed863c6fb16a64d363b'
//     composedMessage = 'Message here'
//     conversationId = '5af12162369a543692248d2a'

//     // Setup DB stub functions
//     Conversation.saveConversation = sinon.stub()

//     Conversation.saveConversation.callsArgWith(2, {
//       'participants': [_id, recipient],
//       '_id': conversationId
//     })

//     db = {}
//     db.save = Conversation.saveConversation

//     // Enable mockery and register DB stub object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/conversation', db)

//     // load chatControllers after registering the DB stub so it dose not load the real one
//     chatControllers = require('controllers/chat')

//     done()
//   })

//   after((done) => {
//     mockery.disable()
//     done()
//   })

//   beforeEach((done) => {
//     // Set up request and response
//     req = {}
//     res = {}
//     done()
//   })

//   it('Should create new conversation', (done) => {
//     req.params = {
//       'recipient': recipient
//     }
//     req.body = {
//       'composedMessage': composedMessage
//     }
//     req.user = {
//       '_id': _id
//     }

//     // Set up response
//     res.status = function (statusCode) {
//       expect(statusCode).to.equal(200)
//       done()
//     }
//     res.json = function (respObj) {
//       expect(respObj.conversationId).to.not.be.undefined
//       expect(respObj.message).to.not.be.undefined
//     }

//     chatControllers.newConversation(req, res, done)
//   })
// })
