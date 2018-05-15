const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})

// MessageSchema.statics.saveMessage = function (message, callbackErr, callbackDone) {
//   message.save((err, message) => {
//     if (err) callbackErr(err)
//     callbackDone(message)
//   })
// }

module.exports = mongoose.model('Message', MessageSchema)
