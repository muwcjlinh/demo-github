const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

//= ======================
// User
//= ======================
const UserSchema = new Schema({
  skyNumber: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  token: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

// Pre-save to the database, hash the skyNumber
UserSchema.pre('save', function (next) {
  const user = this
  const SALT_FACTOR = 5
  /* istanbul ignore if */
  if (!user.isModified('token')) return next()

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    /* istanbul ignore if */
    if (err) return next(err)

    bcrypt.hash(user.token, salt, null, (err, hash) => {
      /* istanbul ignore if */
      if (err) return next(err)
      user.token = hash
      next()
    })
  })
})

// Method to compare token for login
UserSchema.methods.compareToken = function (candidateToken, cb) {
  bcrypt.compare(candidateToken, this.token, (err, isMatch) => {
    /* istanbul ignore if */
    if (err) return cb(err)

    cb(null, isMatch)
  })
}

// UserSchema.statics.saveUser = function (user, callbackErr, callbackDone) {
//   user.save((err, user) => {
//     if (err) callbackErr(err)
//     callbackDone(user)
//   })
// }

module.exports = mongoose.model('User', UserSchema)
