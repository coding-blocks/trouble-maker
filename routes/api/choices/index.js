const Router = require('express').Router()
const DB = require('../../../models')
const passport = require('../../../passport/index')

const { adminOnly } = require('../../../passport/middlewares')

const { Controller } = require('@coding-blocks/express-jsonapi-controller')
const choicesSerializer = require('../../../framework/serializers/choices')

const controller = new Controller(
  DB.choices, // Model you want to create controller instance for
  DB, // Models import for getting related models
  choicesSerializer
)

// const controller = new BaseController(DB.choices)

Router.use(passport.authenticate('bearer', {session: false}), adminOnly)
Router.get('/', controller.handleQuery)
Router.get('/:id', controller.handleQueryById)
Router.patch('/:id', controller.handleUpdateById)
Router.post('/', controller.handleCreate)
Router.delete('/:id', controller.handleDeleteById)


module.exports = Router
