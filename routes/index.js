const passport = require('../passport')
const Api = require('./api')
const cors = require('cors')

const Router = require('express').Router()

Router.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))

Router.use('/api', Api)

Router.get('/login', passport.authenticate('oneauth'))
Router.get('/api/login/callback', passport.authenticate('oneauth'), (req, res) => {
  
})


Router.get('/api/logout', (req, res) => {
  req.logOut()
  res.json({})
})

module.exports = Router