const { Controller: BaseController } = require('@coding-blocks/express-jsonapi-controller')
const Router = require('express').Router()
const DB = require('../../../models')
const passport = require('../../../passport/index')

const { adminOnly } = require('../../../passport/middlewares')
const serializer = require('../../../framework/serializers/choices')

const controller = new BaseController(DB.choices, DB, serializer)

Router.use(passport.authenticate('bearer', {session: false}), adminOnly)
Router.get('/', controller.handleQuery)
Router.get('/:id', controller.handleQueryById)
Router.patch('/:id', controller.handleUpdateById)
Router.post('/', controller.handleCreate)
Router.delete('/:id', controller.handleDeleteById)


module.exports = Router
