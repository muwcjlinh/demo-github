// const sinon = require('sinon')
// const proxyquire = require('proxyquire')
// const assert = require('chai').assert

// describe('Test getConversation function', () => {
//   let chatControllers, messageModelStub, fakeData, mongoResponse, populateMethodStub, selectMethodStub, sortMethodStub, execMethodStub

//   before(() => {
//     fakeData = [
//       {
//         _id: '5af145f43508210e74e0d25c',
//         conversationId: '5af145f43508210e74e0d25b',
//         body: 'test message hihihehe',
//         author: '5af145c33508210e74e0d259',
//         createdAt: '2018-05-08T06:38:44.258+0000',
//         updatedAt: '2018-05-08T06:38:44.258+0000'
//       },
//       {
//         '_id': '5af146163508210e74e0d25d',
//         'conversationId': '5af1191289c1662ebc8ed23f',
//         'body': 'hehe',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:39:18.354+0000',
//         'updatedAt': '2018-05-08T06:39:18.354+0000'
//       },
//       {
//         '_id': '5af1461e3508210e74e0d25e',
//         'conversationId': '5af1191289c1662ebc8ed23f',
//         'body': 'hhihi',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:39:26.134+0000',
//         'updatedAt': '2018-05-08T06:39:26.134+0000'
//       },
//       {
//         '_id': '5af146223508210e74e0d25f',
//         'conversationId': '5af1191289c1662ebc8ed23f',
//         'body': 'huhu',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:39:30.989+0000',
//         'updatedAt': '2018-05-08T06:39:30.989+0000'
//       },
//       {
//         '_id': '5af146283508210e74e0d260',
//         'conversationId': '5af1191289c1662ebc8ed23f',
//         'body': 'hhaha',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:39:36.682+0000',
//         'updatedAt': '2018-05-08T06:39:36.682+0000'
//       },
//       {
//         '_id': '5af146383508210e74e0d261',
//         'conversationId': '5af145f43508210e74e0d25b',
//         'body': 'hhaha',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:39:52.646+0000',
//         'updatedAt': '2018-05-08T06:39:52.646+0000'
//       },
//       {
//         '_id': '5af146443508210e74e0d262',
//         'conversationId': '5af145f43508210e74e0d25b',
//         'body': 'hihi',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:40:04.011+0000',
//         'updatedAt': '2018-05-08T06:40:04.011+0000'
//       },
//       {
//         '_id': '5af1467fe337bf10c5586ce1',
//         'conversationId': '5af145f43508210e74e0d25b',
//         'body': 'huhu',
//         'author': '5af145c33508210e74e0d259',
//         'createdAt': '2018-05-08T06:41:03.579+0000',
//         'updatedAt': '2018-05-08T06:41:03.579+0000'
//       }
//     ]

//     populateMethodStub = {
//       populate: sinon.stub().callsFake(() => execMethodStub)
//     }
//     selectMethodStub = {
//       select: sinon.stub().callsFake(() => sortMethodStub)
//     }
//     sortMethodStub = {
//       sort: sinon.stub().callsFake(() => populateMethodStub)
//     }
//     execMethodStub = {
//       exec: sinon.stub().callsFake(() => mongoResponse)
//     }

//     messageModelStub = {
//       find: sinon.stub().callsFake(() => {
//         return selectMethodStub
//       })
//     }

//     chatControllers = proxyquire('../../../controllers/chat', {
//       '../models/message': messageModelStub
//     })

//     beforeEach(() => {
//       messageModelStub.find.resetHistory()
//       populateMethodStub.populate.resetHistory()
//       selectMethodStub.select.resetHistory()
//       sortMethodStub.sort.resetHistory()
//       execMethodStub.exec.resetHistory()
//     })

//     it('Should get all messages of a conversation', (done) => {
//       let resolveFn
//       let fakeCallback = new Promise((resolve, reject) => {
//         resolveFn = resolve
//       })
//       mongoResponse = Promise.resolve(fakeData)
//       let fakeRes = {
//         json: sinon.stub().callsFake(() => {
//           resolveFn()
//         })
//       }
//       chatControllers.getConversation(null, fakeRes, null)

//       fakeCallback.then(() => {
//         sinon.assert.calledOnce(messageModelStub.find)
//         sinon.assert.calledWith(messageModelStub.find, {})
//         done()
//       }).catch(done)
//     })
//   })
// })

// require('rootpath')()

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const Message = require('../../../models/message')

// describe('Get conversation', () => {
//   let conversationId, req, res, chatControllers, db

//   before((done) => {
//     // fill your db dummy return object
//     conversationId = '5aeb6f1863c6fb16a64d363d'

//     // set up DB stub functions
//     Message.find = sinon.stub()
//     Message.find.callsArgWith(0, {
//       'conversationId': conversationId
//     })

//     db = {}
//     db.find = Message.find

//     // enable mockery and register DB stub object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/message', db)

//     // load chatControllers after registering the DB stub so it does not load the real one
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

//   it('Should get all messeages in a conversation', (done) => {
//     req.params = {
//       'conversationId': conversationId
//     }

//     // set up response
//     res.status = function (statusCode)  {
//       expect(statusCode).to.equal(200)
//       done()
//     }

//     chatControllers.getConversation(req, res, done)
//   })
// })

// const assert = require('chai').assert
// const expect = require('chai').expect
// const sinon = require('sinon')
// const mongoose = require('mongoose')
// require('sinon-mongoose')

// // model Message will be declaired
// require('../../../models/message')

// describe('Test getConversation function', () => {
//   let Message = mongoose.model('Message')
//   let MessageMock = sinon.mock(Message)
//   let conversationId = '5aeb6f1863c6fb16a64d363d'
//   let chatControllers = require('../../../controllers/chat')

//   it('Should get all messages in a conversation', (done) => {
//     MessageMock
//       .expects('find').withArgs({conversationId: conversationId})
//       .chain('select', 'createAt body author')
//       .chain('sort', '-createAt')
//       .chain('populate', {path: 'author', select: 'firstName, lastName'})
//       .chain('exec')
//       .yields(null, 'RESULT')

//     chatControllers.getConversation('5aeb6f1863c6fb16a64d363d', function (err, result) {
//       MessageMock.verify()
//       MessageMock.restore()
//       assert.equal(result, 'RESULT')
//       expect(err).to.not.exist
//       done()
//     })
//   })
// })

// const expect = require('chai').expect
// const sinon = require('sinon')

// const Message = require('../../../models/message')
// const chatControllers = require('../../../controllers/chat')

// describe('Test getConversation function', () => {
//   beforeEach(() => {
//     sinon.stub(Message, 'find')
//   })

//   afterEach(() => {
//     Message.find.restore()
//   })

//   it('Should get all messages in a conversation', () => {
//     const mes1 = {
//       _id: '5af145f43508210e74e0d25c',
//       conversationId: '5af145f43508210e74e0d25b',
//       body: 'test message hihihehe',
//       author: '5af145c33508210e74e0d259',
//       createdAt: '2018-05-08T06:38:44.258+0000',
//       updatedAt: '2018-05-08T06:38:44.258+0000'
//     }
//     const mes2 = {
//       '_id': '5af146163508210e74e0d25d',
//       'conversationId': '5af1191289c1662ebc8ed23f',
//       'body': 'hehe',
//       'author': '5af145c33508210e74e0d259',
//       'createdAt': '2018-05-08T06:39:18.354+0000',
//       'updatedAt': '2018-05-08T06:39:18.354+0000'
//     }
//     const mes3 = {
//       '_id': '5af1461e3508210e74e0d25e',
//       'conversationId': '5af1191289c1662ebc8ed23f',
//       'body': 'hhihi',
//       'author': '5af145c33508210e74e0d259',
//       'createdAt': '2018-05-08T06:39:26.134+0000',
//       'updatedAt': '2018-05-08T06:39:26.134+0000'
//     }
//     const expectModels = [mes1, mes2, mes3]
//     Message.find.yields(null, expectModels)
//     let req = { params: '5af1191289c1662ebc8ed23f' }
//     let res = {
//       send: sinon.stub()
//     }
//     chatControllers.getConversation(req, res)

//     sinon.assert.calledWith(res.send, expectModels)
//   })
// })
