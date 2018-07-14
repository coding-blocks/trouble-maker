const BaseController = require('../../../framework/Controller.class')
const Router = require('express').Router()
const DB = require('../../../models')
const passport = require('../../../passport/index')

const { adminOnly } = require('../../../passport/middlewares')

const controller = new BaseController(DB.choices)

Router.use(passport.authenticate('bearer', {session: false}), adminOnly)
Router.get('/', controller.handleQuery)
Router.get('/:id', controller.handleQueryById)
Router.patch('/:id', controller.handleUpdateById)
Router.post('/', controller.handleCreate)
Router.delete('/:id', controller.handleDeleteById)


module.exports = Router
