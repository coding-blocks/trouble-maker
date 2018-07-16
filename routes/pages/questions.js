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

Router.get('/:id', async (req, res) => {
  const question = await DB.questions.findById(req.params.id, {
    include: [DB.choices, DB.users]
  })
  
  res.render('question', {
    question
  })
})

module.exports = Router