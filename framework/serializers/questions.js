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
      },
      tags: { 
        valueForRelationship (relationship) {
          return {
            id: relationship.id
          }
        }
      }
    }
  }
 
  const options = {
    attributes: ['title', 'description', 'difficulty' ,'user', 'choices', 'tags','createdBy'],
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
    tags: {
      ref: 'id',
      attributes: ['title'],
      included: included.includes('tags')
    },
    ...config
  }

  return options
}