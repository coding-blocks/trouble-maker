const questions = require('./questions')
const choices = require('./choices')
const users = require('./users')
const quiz = require('./quiz')
const Router = require('express').Router()

Router.use('/questions', questions)
Router.use('/choices', choices)
Router.use('/users', users)
Router.use('/quiz',quiz)


module.exports = Router