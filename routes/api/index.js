const questions = require('./questions')
const Router = require('express').Router()

Router.use('/questions', questions)


module.exports = Router