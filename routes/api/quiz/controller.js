const BaseController = require('../../../framework/Controller.class')
const DB = require('../../../models')
const U = require('../../../utils')

class QuizController extends BaseController {
  constructor () {
    super(...arguments)
    new Array('handleSubmit').forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  async handleUpdateById (req, res) {
    const modelObj = await this.deserialize(req.body)
    const questions = modelObj.questions || []
    const quiz = await this._model.findById(req.params.id)
    await quiz.setQuestions(questions)
    super.handleUpdateById(...arguments)
  }

  // body : {
  //   questions: [{
  //     id: '',
  //     markedChoices: []
  //   }]
  // }

  async handleSubmit (req, res, next) {
    const markedQuestions =  req.body.questions

    const quiz = await this._model.findById(req.params.id, {
      include: {
        model: DB.questions,
        include: DB.choices
      }
    })
    const results = markedQuestions.map(markedQuestion => {
      // assert that this markedQuestion belongs to this quiz
      let question = quiz.questions.find(el => el.id == markedQuestion.id)
      
      if (!question) {
        res.status(400).json({
          error: `Question doesnot belongs to this quiz`
        })
        return ;
      }

      // we only interested in POJO
      question = question.get({plain: true})

      // parse the array as integer
      const markedChoices = U.parseIntArray(markedQuestion.markedChoices)
      
      // check if the markedChoice are contained in possibleChoices
      const areMarkedChoiceValid = U.isContainedIn(markedChoices, question.choices.map(_ => _.id))
      
      if(!areMarkedChoiceValid) {
        res.status(400).json({
          error: 'markedChoices are out of bounds'
        })
        return ;
      }

      const { score, correctlyAnswered, incorrectlyAnswered } = U.getScore(markedChoices, U.parseIntArray(question.correctAnswers), question.choices)
      return { 
        id: markedQuestion.id,
        score, 
        correctlyAnswered, 
        incorrectlyAnswered 
      }
    })

    if (!res.headersSent) {
      res.json({
        id: quiz.id,
        type: 'quiz',
        score: results.reduce((acc, val) => acc + val.score, 0),
        questions: results
      })
   
    }

  }
}

module.exports = QuizController