const passport = require('passport')
const User = require('../models/user')
const config = require('../config/main')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const localOptions = {
  usernameField: 'skyNumber',
  passwordField: 'token'
}

// Set up local login strategy
const localLogin = new LocalStrategy(localOptions, function (skyNumber, token, done) {
  User.findOne({ skyNumber: skyNumber }, (err, user) => {
    /* istanbul ignore if */
    if (err) return done(err)
    if (!user) {
      return done(null, false, { error: 'Could not be verified.' })
    }

    user.compareToken(token, (err, isMatch) => {
      /* istanbul ignore if */
      if (err) return done(err)
      if (!isMatch) {
        return done(null, false, { error: 'Could not be verified.' })
      }
      return done(null, user)
    })
  })
})

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
}

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload._id, function (err, user) {
    /* istanbul ignore if */
    if (err) { return done(err, false) }
    /* istanbul ignore else */
    if (user) {
      done(null, user)
    } /* istanbul ignore next */ else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
