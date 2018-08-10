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
    let markedQuestions =  req.body.questions

    const quiz = await this._model.findById(req.params.id, {
      include: {
        model: DB.questions,
        include: {
          model: DB.choices,
          attributes: ['id', 'title', 'positiveWeight', 'negativeWeight']
        }
      }
    })

    if (!Array.isArray(markedQuestions)) {
      //user has not marked any choice
      markedQuestions = [] 
    }
    
    const results = quiz.questions.map(question => {
      const markedQuestion = markedQuestions.find(el => el.id == question.id)

      if (!markedQuestion) {
        //user marked no response for this question
        return {
          id: question.id,
          score: 0,
          correctlyAnswered: [],
          incorrectlyAnswered: [],
          answers: req.query.showAnswers ? question.correctAnswers : undefined
        }
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
        incorrectlyAnswered,
        answers: req.query.showAnswers ? question.correctAnswers : undefined
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