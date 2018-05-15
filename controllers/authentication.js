const User = require('../models/user')
const generateToken = require('../config/helpers').generateToken
const filterUserInfo = require('../config/helpers').filterUserInfo
const getRandomNumber = require('../config/helpers').getRandomNumber
const statusCode = require('../constants/status_code')

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {
  res.status(statusCode.OK).json({
    user: filterUserInfo(req.user)
  })
}

//= =======================================
// Registration Route
//= =======================================
exports.register = function (req, res, next) {
  const randomNumber = getRandomNumber(10000000, 99999999)

  User.findOne({ skyNumber: randomNumber }, function (err, existingNumber) {
    /* istanbul ignore if */
    if (err) { return next(err) }
    /* eslint-disable */
    /* istanbul ignore next */
    while (existingNumber) {
      const randomNumber = getRandomNumber(10000000, 99999999)
    };
    /* eslint-enable */

    // If number is unique then create new user
    let user = new User({
      skyNumber: randomNumber
    })

    const userInfo = filterUserInfo(user)
    const createdToken = generateToken(userInfo)
    user.token = createdToken

    user.save((err, user) => {
      /* istanbul ignore if */
      if (err) { return next(err) }

      res.status(statusCode.CREATED).json({
        token: createdToken,
        user: userInfo
      })
    })

    // User.saveUser(user, (err) => {
    //   if (err) throw err
    // }, (saveUser) => {
    //   return res.status(statusCode.CREATED).json({
    //     token: createdToken,
    //     user: userInfo
    //   })
    // })
  })
}
