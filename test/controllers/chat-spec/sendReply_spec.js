// const sinon = require('sinon')
// const expect = require('chai').expect

// const Message = require('../../../models/message')
// const chatControllers = require('../../../controllers/chat')

// describe('Test sendReply function', () => {
//   beforeEach(() => {
//     sinon.stub(Message, 'saveMessage')
//   })

//   afterEach(() => {
//     Message.saveMessage.restore()
//   })

//   it('Should send reply message', (done) => {
//     const reply = {
//       conversationId: 'Test conversationID here',
//       body: 'Test message here',
//       author: 'Test author here'
//     }

//     Message.save.yields(null, reply)
//     const req = {
//       params: reply.conversationId,
//       body: reply.body,
//       user: reply.author
//     }
//     const res = {
//       status: sinon.stub(),
//       json: sinon.stub()
//     }

//     chatControllers.sendReply(req, res)

//     sinon.assert.calledWith(res.json, res.status, reply)

//     done()
//   })
// })
