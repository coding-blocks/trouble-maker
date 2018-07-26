module.exports = function (included = [], type, config) {
  if (typeof type === 'object') {
    config = type
  }

  if (type === 'deserialize') {
    return {
      keyForAttribute: 'camelCase',
      questions: {
        valueForRelationship (relationship) {
          return relationship.id
        }
      }
    }
  }

  const options = {
    attributes: ['title', 'description', 'image', 'duration', 'maxAttempts', 'startDate', 'endDate', 'user', 'questions'],
    meta: {
      pagination: function (record) {
        return record.pagination
      }
    },
    user: {
      ref: 'id',
      attributes: ['firstname', 'lastname', 'email', 'role'],
      included: included.includes('user')
    },
    questions: {
      ref: 'id',
      ...require('./questions')([], 'serialize'),
      included: included.includes('questions')
    },

    ...config
  }

  return options
}