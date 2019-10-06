const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

/**
 * JWT Convention
 * @param {*} sub Subject
 * @param {*} iat Issued at time
 */
const tokenForUser = ({ id }) =>
  jwt.encode({ sub: id, iat: new Date().getTime() }, config.secret)

exports.signin = (req, res, _) => {
  // At this point the email and password have already been verified.
  // Or else we would have been kicked out of the flow
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body

  // See if a user with email exists
  User.findOne({ email }, (error, existingUser) => {
    if (error) next({ error })

    // If user with email does exist, return an error
    if (existingUser)
      res.status(422).send({ error: `Email ${email} already exists` })

    // If user with email does not exist, create and save user record
    const user = new User({ email, password })
    user.save(err => {
      if (err) return next(err)

      // User was saved, send back the user
      res.json({ token: tokenForUser(user) })
    })
  })
}
