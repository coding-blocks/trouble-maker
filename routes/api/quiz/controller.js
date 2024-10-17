const { Controller: BaseController } = require('@coding-blocks/express-jsonapi-controller')
const DB = require('../../../models')
const U = require('../../../utils')
const R = require('ramda')
const WhispererService = require('../../../services/whisperer')
const Sequelize = require('sequelize') 

class QuizController extends BaseController {
  constructor () {
    super(...arguments)
    new Array('handleSubmit', 'handleGetAllQuestionsOfQuiz').forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  async handleUpdateById (req, res) {
    const modelObj = await this.deserialize(req.body)
    let questions = modelObj.questions || []
    const quiz = await this._model.findById(req.params.id, {
      include: DB.questions
    })
    const oldQuestions = quiz.questions.map(q => q.id)

    questions = questions.map(q => +q)
    const questionsToAdd = R.difference(questions, oldQuestions)
    const questionToRemove = R.difference(oldQuestions, questions)

    const addQuestions = quiz.addQuestions(questionsToAdd, {
      through: {
        updatedById: req.user.id
      }
    })

    const removeQuestions = DB.quizQuestions.destroy({
      where:{
        quizId: quiz.id,
        questionId: {
          $in: questionToRemove
        }
      }
    })

    const setUpdatedBy = DB.quizQuestions.update({
      updatedById: req.user.id
    }, {
      where: {
        quizId: quiz.id
      }
    })

    await Promise.all([addQuestions, removeQuestions, setUpdatedBy])
    return super.handleUpdateById(...arguments)
  }

  // async onAfterUpdate(req, model) {
  //   WhispererService.emit('troublemaker_quiz.updated', {
  //     body: {
  //       resourceId: model.id,
  //       resource: 'quiz'
  //     }
  //   })
  // }

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

      const { score, correctlyAnswered, incorrectlyAnswered, questionAnsweredCorrectly } = U.getScore(markedChoices, U.parseIntArray(question.correctAnswers), question)
      
      return {
        id: markedQuestion.id,
        score,
        questionAnsweredCorrectly,
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

  async handleGetAllQuestionsOfQuiz(req, res, next) {
      const quiz = await this._model.findById(req.params.id, {
          include: DB.questions
      })

      const questions = quiz.questions.map((q) => {
          return q.get()
      })
      res.json(questions)
  }

  async onAfterGetById(req, quiz) {
    const [result] = await DB.quizzes.findAll({
      logging: true,
     includeIgnoreAttributes: false,
      attributes: [ 'id' ,[Sequelize.fn('sum', Sequelize.col('questions.positiveScore')), 'total']],
      include: {
        model: DB.questions,
      },
     where: {
        id: quiz.id
      },
      group: ['quizzes.id']
    })
    quiz.maxMarks = result ? +result.get('total') : 0
  }

  async handleGetMaxMarks(req, res) {
    const quiz = await DB.quizzes.findById(req.params.id, {
      include: { model: DB.questions }
    })
    const maxMarks = quiz.questions.reduce((acc, cur) => acc + cur.get('positiveScore'), 0)
    res.json({
      maxMarks
    })
  }
}

module.exports = QuizController
