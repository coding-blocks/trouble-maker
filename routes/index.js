const Homepage = require('./pages/home')
const passport = require('../passport')
const Api = require('./api')

const Router = require('express').Router()

Router.use('/api', Api)
Router.use('/home', Homepage)

Router.get('/', (req, res) => {
  res.redirect('/home')
})

Router.get('/login', passport.authenticate('oneauth'))
Router.get('/login/callback', passport.authenticate('oneauth'), (req, res) => {
  res.redirect('/')
})
Router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

module.exports = Router