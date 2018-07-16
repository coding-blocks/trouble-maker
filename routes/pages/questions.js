const Router = require('express').Router()
const DB = require('../../models')

Router.get('/', async (req, res) => {
  const questions = await DB.questions.findAll({
    limit: 20
  })

  res.render('questions', {
    questions
  })
})

module.exports = Router