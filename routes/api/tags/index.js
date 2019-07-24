/**
 * Created by imdhruvgupta on 11/7/19.
 */

const {Controller: BaseController} = require('@coding-blocks/express-jsonapi-controller')
const routes = require('express').Router()
const DB = require('../../../models/index')

const passport = require('../../../passport/index')
const { adminOnly } = require('../../../passport/middlewares')
const serializer = require('../../../framework/serializers/tags')

const controller = new BaseController(DB.tags, DB, serializer)

routes.use(passport.authenticate('bearer', {session: false}), adminOnly)

routes.get('/', controller.handleQuery)
routes.post('/', controller.handleCreate)

module.exports = routes
