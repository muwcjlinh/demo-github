const Conversation = require('../models/conversation')
const Message = require('../models/message')
const statusMessage = require('../constants/message')
const statusCode = require('../constants/status_code')

exports.getAllConversations = function (req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec((err, conversations) => {
      /* istanbul ignore if */
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      // Set up empty array to hold conversations + most recent message
      const fullConversations = []
      conversations.forEach((conversation) => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'firstName lastName'
          })
          .exec((err, message) => {
            /* istanbul ignore if */
            if (err) {
              res.send({ error: err })
              return next(err)
            }
            fullConversations.push(message)
            /* istanbul ignore else */
            if (fullConversations.length === conversations.length) {
              return res.status(statusCode.OK).json({ conversations: fullConversations })
            }
          })
      })
    })
}

exports.getConversation = function (req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'firstName lastName'
    })
    .limit(10)
    .exec((err, messages) => {
      /* istanbul ignore if */
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      return res.status(statusCode.OK).json({ conversation: messages })
    })
}

// Load 10 messages a time when user scroll up
exports.loadMessagesWithTime = function (req, res, next) {
  let time = req.params.createdAt
  Message.find({ conversationId: req.params.conversationId, createdAt: {'$lt': time} })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'firstName lastName'
    })
    .limit(10)
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      return res.status(200).json({ conversation: messages })
    })
}

exports.newConversation = function (req, res, next) {
  if (!req.params.recipient) {
    res.status(statusCode.UNPROCESSABLE_ENTITY).send({ error: statusMessage.chooseRecipient })
    return next()
  }

  if (!req.body.composedMessage) {
    res.status(statusCode.UNPROCESSABLE_ENTITY).send({ error: statusMessage.missingMessage })
    return next()
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  })

  // Conversation.saveConversation(conversation, (err) => {
  //   if (err) throw err
  // }, (saveConversation) => {
  //   const message = new Message({
  //     conversationId: conversation._id,
  //     body: req.body.composedMessage,
  //     author: req.user._id
  //   })

  //   Message.saveMessage(message, (err) => {
  //     if (err) {
  //       throw err
  //     }
  //   }, (sendMessage) => {
  //     return res.status(statusCode.OK).json({ message: statusMessage.conversationStarted, conversationId: conversation._id })
  //   })
  // })

  conversation.save((err, newConversation) => {
    /* istanbul ignore if */
    if (err) {
      res.send({ error: err })
      return next(err)
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    })

    message.save((err, newMessage) => {
      /* istanbul ignore if */
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      return res.status(statusCode.OK).json({ message: statusMessage.conversationStarted, conversationId: conversation._id })
    })

    // Message.saveMessage(message, (err) => {
    //   if (err) {
    //     throw err
    //   }
    // }, (sendMessage) => {
    //   return res.status(statusCode.OK).json({ message: statusMessage.conversationStarted, conversationId: conversation._id })
    // })
  })
}

exports.sendReply = function (req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  })

  reply.save((err, newMessage) => {
    /* istanbul ignore if */
    if (err) {
      res.send({ error: err })
      return next(err)
    }

    return res.status(statusCode.OK).json({ message: statusMessage.sentMessage, time: reply.createdAt })
  })

  // Message.saveMessage(reply, (err) => {
  //   if (err) {
  //     throw err
  //   }
  // }, (sendReply) => {
  //   return res.status(statusCode.OK).json({ message: statusMessage.sentMessage })
  // })
}
