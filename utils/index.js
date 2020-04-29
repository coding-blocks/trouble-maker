const R = require('ramda')

/*

*/
const parseIntArray = (a) => a.map(el => {
  if (isNaN(+el)) 
    throw new Error('CANNOT_PARSE_ARRAY_AS_INT')
  else
    return +el
})

const not = fn => () => !fn(...arguments)

const arrayEquals = (arr1, arr2) => {
  const set = new Set([...arr1, ...arr2])
  return set.size == arr1.length == arr2.length
}

/* 
  (a, b) -> Boolean

  if a is fully contained in b; all elements of a are in b
*/
const isContainedIn = (a, b) => R.intersection(a, b).length === a.length

/*
  markedChoices = Array of ids
  correctChoices = Array of Sequelize model instances of correctChoices
*/
const getScore = (markedChoices, correctChoiceIds, question) => {
  const possibleChoices = question.choices
  // const correctChoiceIds = correctChoices.map(_ => _.id)

  // is the id in the correctChoiceIds
  const isCorrect = R.contains(R.__, correctChoiceIds)

  const correctlyAnsweredIds = markedChoices.filter(isCorrect)
  const incorrectlyAnsweredIds = markedChoices.filter(el => !isCorrect(el))

  const correctlyAnswered = possibleChoices.filter(choice => R.contains(choice.id, correctlyAnsweredIds))
  const incorrectlyAnswered = possibleChoices.filter(choice => R.contains(choice.id, incorrectlyAnsweredIds))

  const score = arrayEquals(correctChoiceIds, correctlyAnsweredIds) ? question.positiveScore : -question.negativeScore

  return {
    score,
    correctlyAnswered,
    incorrectlyAnswered
  }
}

module.exports = {
  isContainedIn,
  parseIntArray,
  getScore
}
