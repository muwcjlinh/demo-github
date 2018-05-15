const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema defines how chat message will be stored in mongodb
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

// ConversationSchema.statics.saveConversation = function (conversation, callbackErr, callbackDone) {
//   conversation.save((err, conversation) => {
//     if (err) callbackErr(err)
//     callbackDone(conversation)
//   })
// }

module.exports = mongoose.model('Conversation', ConversationSchema)
