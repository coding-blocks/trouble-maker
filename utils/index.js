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

/* 
  (a, b) -> Boolean

  if a is fully contained in b; all elements of a are in b
*/
const isContainedIn = (a, b) => R.intersection(a, b).length === a.length

/*
  markedChoices = Array of ids
  correctChoices = Array of Sequelize model instances of correctChoices
*/
const getScore = (markedChoices, correctChoiceIds, possibleChoices) => {
  // const correctChoiceIds = correctChoices.map(_ => _.id)

  // is the id in the correctChoiceIds
  const isCorrect = R.contains(R.__, correctChoiceIds)

  const correctlyAnsweredIds = markedChoices.filter(isCorrect)
  const incorrectlyAnsweredIds = markedChoices.filter(el => !isCorrect(el))

  const correctlyAnswered = possibleChoices.filter(choice => R.contains(choice.id, correctlyAnsweredIds))
  const incorrectlyAnswered = possibleChoices.filter(choice => R.contains(choice.id, incorrectlyAnsweredIds))

  let score = correctlyAnswered.reduce((acc, c) => acc + c.positiveWeight, 0)
  score += incorrectlyAnswered.reduce((acc, c) => acc + c.negativeWeight, 0)

  // scale score out of 10
  score *= 10

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