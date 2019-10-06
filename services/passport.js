const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Set up options for JWT strategy
// Tell the strategy where to look for the token
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// 1. Create JWT Strategy

/**
 * payload { sub, iat }
 * @param {*} sub Subject
 * @param {*} iat Issued at time
 */
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user Id in the payload exists in the Database
  // If it does call done with that user
  // otherwise call done without the user object
  User.findById(payload.sub, function(err, user) {
    // Search failed to occer
    if (err) done(err, false)
    // Found a user
    if (user) done(null, user)
    // Did not find a user
    else done(null, false)
  })
})

// Expects a username, must pass option to check for email property
const localOptions = { usernameField: 'email' }
// Create Local Strategy, when user recieves token from Email Password
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify this email and password
  User.findOne({ email: email }, function(err, user) {
    // Search failed to occer
    if (err) done(err, false)
    // Did not find a user
    if (!user) done(null, false)

    // compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) done(err)
      if (!isMatch) done(null, false)

      return done(null, user)
    })
  })
})

// 2. Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
