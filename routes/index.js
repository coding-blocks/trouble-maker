const passport = require('../passport')
const Api = require('./api')
const cors = require('cors')
const DB = require('../models')

const Router = require('express').Router()

Router.use(cors())

Router.use('/api', Api)

Router.get('/login', passport.authenticate('oneauth'))
Router.get('/api/login/callback', passport.authenticate('oneauth'), (req, res) => {
  res.json(req.user)
})


Router.get('/api/logout', passport.authenticate('bearer'), (req, res) => {
  DB.sessions.destroy({
    where: {
      userId: req.user.id
    }
  }).then(() => res.json({}))
})

module.exports = Router