const BaseController = require('./controller')
const Router = require('express').Router()
const DB = require('../../../models')
const passport = require('../../../passport/index')

const { adminOnly } = require('../../../passport/middlewares')


const controller = new BaseController(DB.questions)

Router.use(passport.authenticate('bearer', {session: false}), adminOnly)

// CRUDS
Router.get('/', controller.handleQuery)
Router.get('/:id', controller.handleQueryById)
Router.patch('/:id', controller.handleUpdateById)
// TODO: check correctAnswers, we should check if the id exists in choices
Router.post('/', controller.handleCreate)
Router.delete('/:id', controller.handleDeleteById)


Router.get('/:id/answers', controller.handleGetAnswers)
Router.patch('/:id/answers', controller.handleUpdateAnswers)

Router.post('/:id/submit', controller.submitQuestion)

module.exports = Router
