const questions = require('./questions')
const choices = require('./choices')
const Router = require('express').Router()

Router.use('/questions', questions)
Router.use('/choices', choices)


module.exports = Router