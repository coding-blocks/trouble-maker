const BaseController = require('../../../framework/Controller.class')

class QuestionsController extends BaseController {
  constructor () {
    super(...arguments)
    this.handleGetAnswers = this.handleGetAnswers.bind(this)
    this.handleUpdateAnswers = this.handleUpdateAnswers.bind(this)
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

}

module.exports = QuestionsController