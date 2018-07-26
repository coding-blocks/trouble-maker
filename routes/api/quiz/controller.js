const BaseController = require('../../../framework/Controller.class')
const DB = require('../../../models')
const U = require('../../../utils')

class QuizController extends BaseController {
  async handleUpdateById (req, res) {
    const modelObj = await this.deserialize(req.body)
    const questions = modelObj.questions || []
    const quiz = await this._model.findById(req.params.id)
    await quiz.setQuestions(questions)
    super.handleUpdateById(...arguments)
  }
}

module.exports = QuizController