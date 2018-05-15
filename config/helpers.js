const jwt = require('jsonwebtoken')
const config = require('./main')

// Generate token
exports.generateToken = function (user) {
  return jwt.sign(user, config.secret, {
    expiresIn: '7777777777777777d'
  })
}

// get user info from request, filter out info for viewProfile function
exports.filterUserInfo = function (request) {
  const getUserInfo = {
    _id: request._id,
    firstName: request.firstName,
    lastName: request.lastName,
    skyNumber: request.skyNumber
  }
  return getUserInfo
}

// Get random number and use it for skyNumber
exports.getRandomNumber = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
