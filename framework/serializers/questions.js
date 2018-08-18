module.exports = function (included = [], type, config) {
  if (typeof type === 'object') {
    config = type
  }

  if (type === 'deserialize') {
    return {
      keyForAttribute: 'camelCase',
      users: {
        valueForRelationship (relationship) {
          return {
            id: relationship.id
          }
        }
      }
    }
  }

  const options = {
    attributes: ['title', 'description', 'difficulty', 'multipleCorrect', 'user', 'choices', 'createdBy'],
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
    choices: {
      ref: 'id',
      attributes: ['title', 'description', 'positiveWeight' ,'negativeWeight', 'question'],
      included: included.includes('choices')
    },
    ...config
  }

  return options
}