// require('rootpath')

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const Message = require('../../models/message')
// const Conversation = require('../../models/conversation')

// describe('Chat controllers', () => {
//   let chatControllers, db, res, req
//   describe('Create new conversation', () => {
//     let recipient, composedMessage, userId

//     before((done) => {
//       // fill your db dummy return object
//       recipient = '5ae99690e1d9710b41201c1d'
//       userId = '5ae99690e1d9710b44201c1e'
//       composedMessage = 'Test create new conversation'

//       // set up DB stub functions
//       Conversation.save = sinon.stub()
//       Conversation.save.callsArgWith(0, null, {
//         'participants': [userId, recipient]
//       })

//       db = {}
//       db.save = Conversation.save

//       db2 = {}
//       db2.save = Message.save

//       // enable mockery and register DB stub object
//       mockery.enable({
//         warnOnReplace: true,
//         warnOnUnregistered: false,
//         useCleanCache: false
//       })

//       mockery.registerMock('models/conversation', db)

//       // load chatControllers
//       chatControllers = require('controllers/chat')

//       done()
//     })

//     after((done) => {
//       mockery.disable()
//       done()
//     })

//     beforeEach((done) => {
//       req = {}
//       res = {}
//       done()
//     })

//     it('Should create new conversation', (done) => {
//       req.params = {
//         'recipient': recipient
//       }
//       req.body = {
//         'composedMessage': composedMessage
//       }
//       req.user = {
//         '_id': userId
//       }

//       res.status = function (statusCode) {
//         expect(statusCode).to.equal(200)
//         done()
//       }

//       chatControllers.newConversation(req, res, done)
//     })
//   })
// })

// const sinon = require('sinon')
// const chatControllers = require('../../controllers/chat')
// const Conversation = require('../../models/conversation')
// const Message = require('../../models/message')

// describe('Chat controllers', () => {
//   it('Should create new conversation', sinon.test(function () {
//     var conversation = {
//       save: sinon.stub()
//     }

//   }))
// })
