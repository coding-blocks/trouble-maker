const Router = require('express').Router()
const passport = require('../../../passport')


Router.use(passport.authenticate('bearer', {session: false}))

Router.get('/me', (req, res) => {
  res.json(req.user)
})

module.exports = Router