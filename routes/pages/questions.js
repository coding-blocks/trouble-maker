const Router = require('express').Router()
const DB = require('../../models')
const { ensureLoggedIn } = require('connect-ensure-login')

Router.get('/', ensureLoggedIn('/login'), async (req, res) => {
  const questions = await DB.questions.findAll({
    limit: 20
  })

  res.render('questions', {
    questions
  })
})

module.exports = Router