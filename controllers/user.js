const User = require('../models/user')
const filterUserInfo = require('../config/helpers').filterUserInfo
const statusMessage = require('../constants/message')
const statusCode = require('../constants/status_code')

//= =============================
// User route
//= =============================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId

  if (req.user._id.toString() !== userId) {
    return res.status(statusCode.UNAUTHORIZED).json({ error: statusMessage.unAuthorized })
  }

  User.findById(userId, (err, user) => {
    /* istanbul ignore if */
    if (err) {
      res.status(statusCode.BAD_REQUEST).json({ error: statusMessage.noUserToBeFound })
      return next()
    }
    const userToReturn = filterUserInfo(user)
    return res.status(statusCode.OK).json({ user: userToReturn })
  })
}

// exports.updateProfile = function(req, res, next) {

// };
