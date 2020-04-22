module.exports = function (included = [], type, config) {
  if (typeof type === 'object') {
    config = type
  }

  if (type === 'deserialize') {
    return {
      keyForAttribute: 'camelCase',
      questions: { /* should be the type and not the key name */
        valueForRelationship (relationship) {
          return {
            id: relationship.id
          }
        }
      }
    }
  }

  const options = {
    attributes: ['title', 'description', 'question'],
    meta: {
      pagination: function (record) {
        return record.pagination
      }
    },
    question: {
      ref: 'id',
      attributes: ['title', 'description', 'difficulty' ,'user', 'createdBy'],
      included: included.includes('question')
    },
    ...config
  }

  return options
}