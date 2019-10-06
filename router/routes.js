const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

// By default passport wants to make a cookie pabsed session
// We set session:false to prevent this
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = app => {
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)

  app.get('/', requireAuth, (req, res, next) => {
    res.send({ success: true, errors: false })
  })
}
