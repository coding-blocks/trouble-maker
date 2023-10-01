const { Controller: BaseController } = require('@coding-blocks/express-jsonapi-controller')
const DB = require('../../../models')
const U = require('../../../utils')
const R = require('ramda')
const WhispererService = require('../../../services/whisperer')
const Sequelize = require('sequelize') 
const tagSerializer = require('../../../framework/serializers/tags')

class TagsController extends BaseController {
  constructor () {
    super(...arguments)
  }

  async onAfterGetQuery(req, rows) {
    if(req.query.random === 'si') {//como estas amigo
      if(req.query.random_count && +req.query.random_count > 1) {
        rows.sort(() => 0.5 - Math.random())//shuffle array
        rows.splice(+req.query.random_count, Infinity)//select first n
      } else {
        const randomIndex = Math.floor(Math.random() * rows.length)
        rows.splice(0, randomIndex)
        rows.splice(1, Infinity)
      }
    }
  }
}

module.exports = new TagsController(DB.tags, DB, tagSerializer)