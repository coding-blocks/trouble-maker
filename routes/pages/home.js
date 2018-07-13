const Router = require('express').Router()

const passport = require('../../passport')

Router.get('/', (req, res) => {
  res.render('home')
})

Router.get('/me', (req, res) => {
  res.render('home', {
    user: req.user
  })
})



module.exports = Router