const questions = require('./questions')
const choices = require('./choices')
const users = require('./users')
const quiz = require('./quiz')
const tags = require('./tags')
const Router = require('express').Router()

Router.use('/questions', questions)
Router.use('/choices', choices)
Router.use('/users', users)
Router.use('/quizzes', quiz)
Router.use('/tags', tags)


module.exports = Router