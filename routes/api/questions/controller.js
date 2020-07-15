const { Controller: BaseController } = require('@coding-blocks/express-jsonapi-controller')
const DB = require('../../../models')
const U = require('../../../utils')
const R = require('ramda')

class QuestionsController extends BaseController {
  constructor () {
    super(...arguments)
    this.handleGetAnswers = this.handleGetAnswers.bind(this)
    this.handleUpdateAnswers = this.handleUpdateAnswers.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
  }
  
  async findAll (req, res) {
    const tags = req.query.filter && req.query.filter.tags

    if (!tags) {
      return super.findAll(...arguments)
    }

    const tagsWhere = {
      id: {
        $in: tags
      }
    }
    
    delete req.query.filter.tags
    
    return this._model.findAndCountAll({
      ...this.generateAttributesClause(req),
      distinct: 'id',
      where: this.generateWhereClause(req),
      include: [
        ...this.generateIncludeStatement(req).filter(o => o.model.name != 'tags'),
        ...[{
          model: DB.tags,
          where: tagsWhere
        }]
      ],
      order: this.generateSortingCondition(req),
      limit: this.generateLimitStatement(req),
      offset: this.generateOffsetStatement(req)
    })
  
  }

  async onAfterCreate(req, model) {
    model.multicorrect = model.correctAnswers.length > 1 
    return model.save()
  }

  async onAfterUpdate(req, model) {
    model.multicorrect = model.correctAnswers.length > 1 || model.multicorrect
    return model.save()
  }
  
  async handleUpdateById(req, res) {
    const modelObj = await this.deserialize(req.body)
    let newtags = modelObj.tags || []
    const question = await this._model.findById(req.params.id, {
      include: DB.tags
    })
    
    const oldTags = question.tags.map(q => q.id)
    newtags = newtags.map(q => +q.id)
    
    const tagsToAdd = R.difference(newtags, oldTags)
    const tagsToRemove = R.difference(oldTags, newtags)
    
    const addTags = question.addTags(tagsToAdd)
    
    const removeTags = DB.questionsTags.destroy({
      where:{
        questionId: question.id,
        tagId: {
          $in: tagsToRemove
        }
      }
    })
    
    await Promise.all([addTags, removeTags])
    return super.handleUpdateById(...arguments)
  }
  
  async handleGetAnswers (req, res) {
    const { id } = req.params

    const question = await this._model.findById(id, {
      attributes: ['id', 'correctAnswers']
    })

    if (!question) {
      // no question of this id
      res.sendStatus(404)
    }

    res.json(question.get({plain: true}))
  }

  async handleUpdateAnswers (req, res) {
    const { id } = req.params
    const { correctAnswers } = req.body

    for (let el of correctAnswers) {
      if (!el || isNaN(+el)) {
        return res.sendStatus(400)
      }
    }
    
    await this._model.update({
      correctAnswers
    }, {
      where: {
        id
      }
    })
    
    res.sendStatus(204)
  }
  
  /*
  body: {
    markedChoices: ['1', '2']
  }
  
  */
  async submitQuestion (req, res) {
    let { markedChoices } = req.body
    
    if (!markedChoices || !Array.isArray(markedChoices)) {
      return res.status(400).json({
        error: 'markedChoices must be an Array with marked choice Ids'
      })
    }
    
    try {
      markedChoices = U.parseIntArray(markedChoices)
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid Array for markedChoices' 
      })
    }
    
    
    const question = await this._model.findById(req.params.id, {
      include: DB.choices
    })
    
    if (!question) {
      return res.sendStatus(404)
    }
    
    const possibleChoices = question.choices.map(_ => _.id)    
    
    // markedChoices should be one of possibleChoices
    const areMarkedChoiceValid = U.isContainedIn(markedChoices, possibleChoices)
    
    if (!areMarkedChoiceValid) {
      return res.status(400).json({
        error: 'markedChoices array is invalid'
      })
    }
    
    // const correctChoices = await DB.choices.findAll({
    //   where: {
    //     id: {
    //       $in: question.correctAnswers
    //     }
    //   }
    // })
    
    const { score, correctlyAnswered, incorrectlyAnswered } = U.getScore(markedChoices, U.parseIntArray(question.correctAnswers), question.choices)
    
    res.json({
      score,
      correctlyAnswered,
      incorrectlyAnswered
    })
  }
  
}

module.exports = QuestionsController