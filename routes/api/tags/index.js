/**
 * Created by imdhruvgupta on 11/7/19.
 */
const routes = require('express').Router()

const passport = require('../../../passport/index')
const { adminOnly } = require('../../../passport/middlewares')

const controller = require('./controller')

routes.use(passport.authenticate(['bearer', 'api-bearer'], {session: false}), adminOnly)

routes.get('/', controller.handleQuery)
routes.post('/', controller.handleCreate)

module.exports = routes
