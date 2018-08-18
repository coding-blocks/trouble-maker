const BaseController = require('../../../framework/Controller.class')
const DB = require('../../../models')
const U = require('../../../utils')

class QuestionsController extends BaseController {
  constructor () {
    super(...arguments)
    this.handleGetAnswers = this.handleGetAnswers.bind(this)
    this.handleUpdateAnswers = this.handleUpdateAnswers.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
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

    let question = await this._model.findById(id, {
      attributes: ['multiCorrect']
    })

    if((!question.multiCorrect) && (correctAnswers.length > 1)){
      res.sendStatus(400).json({
        error: 'correctAnswers Array length should be One for single choice question'
      })
      return
    }

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

    if((!question.multiCorrect) && (markedChoices.length > 1)){
      res.sendStatus(400)
      return
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