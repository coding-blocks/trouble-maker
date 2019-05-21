const BaseController = require('../../../framework/Controller.class')
const routes = require('express').Router()
const DB = require('../../../models')

const passport = require('../../../passport/index')
const { adminOnly } = require('../../../passport/middlewares')

const controller = new BaseController(DB.tags)

routes.use(passport.authenticate('bearer', {session: false}), adminOnly)

routes.get('/', controller.handleQuery)
routes.get('/:id', controller.handleQueryById)
routes.post('/', controller.handleCreate)

module.exports = routes;
