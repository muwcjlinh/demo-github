// require('rootpath')()

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const Message = require('../../../models/message')

// describe('Send Reply', () => {
//   let conversationId, composedMessage, _id, db, chatControllers, req, res

//   before((done) => {
//     // fill your db dummy return object
//     conversationId = '5aeb6f1863c6fb16a64d363d'
//     composedMessage = 'Test message reply'
//     _id = '5aeb6ed863c6fb16a64d363b'

//     // set up DB stub functions
//     Message.saveMessage = sinon.stub()
//     Message.saveMessage.callsArgWith(2, {
//       'conversationId': conversationId,
//       'body': composedMessage,
//       'author': _id
//     })

//     db = {}
//     db.save = Message.saveMessage

//     // enable mockery and register DB stub object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/message', db)

//     // load chatController after registering the DB stub so it does not load the real one
//     chatControllers = require('controllers/chat')

//     done()
//   })

//   after((done) => {
//     mockery.disable()
//     done()
//   })

//   beforeEach((done) => {
//     // set up request and response
//     req = {}
//     res = {}
//     done()
//   })

//   it('Should send reply', (done) => {
//     req.params = {
//       'conversationId': conversationId
//     }
//     req.body = {
//       'composedMessage': composedMessage
//     }
//     req.user = {
//       '_id': _id
//     }

//     // set up response
//     res.status = function (statusCode) {
//       expect(statusCode).to.equal(200)
//       done()
//     }

//     chatControllers.sendReply(req, res, done)
//   })
// })
