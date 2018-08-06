const BaseController = require('./controller')
const routes = require('express').Router()
const DB = require('../../../models')

const passport = require('../../../passport/index')

const controller = new BaseController(DB.quizzes)

routes.get('/', controller.handleQuery)
routes.get('/:id', controller.handleQueryById)
routes.post('/', controller.handleCreate)
routes.patch('/:id', controller.handleUpdateById)
routes.delete('/:id', controller.handleDeleteById)

// TODO: write the handleSubmit function in controller.
routes.post('/:id/submit', passport.authenticate('bearer', {session: false}), (req, res, next) => {
  if (req.query.showAnswers) {
    // make sure req.user is admin
    if (req.user.role === 'ADMIN') {
      next(null, req, res)
    } else {
      res.status(400).json({
        error: 'You cannot request answers as non-admin'
      })
    }
  } else {
    next(null, req, res)
  }
}, controller.handleSubmit)

module.exports = routes;