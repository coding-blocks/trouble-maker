const BaseController = require('./controller')
const routes = require('express').Router()
const DB = require('../../../models')
const controller = new BaseController(DB.quizzes)

routes.get('/', controller.handleQuery)
routes.get('/:id',controller.handleQueryById)
routes.post('/',controller.handleCreate)
routes.patch('/:id', controller.handleUpdateById)
routes.delete('/:id', controller.handleDeleteById)

// TODO: write the handleSubmit function in controller.
//routes.post('/:id/submit',controller.handleSubmit)

module.exports = routes;