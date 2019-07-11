/**
 * Created by imdhruvgupta on 11/7/19.
 */

module.exports = function(included = [], type,config) {
    if(typeof type === Object) {
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
        attributes: ['title', 'user', 'questions', 'createdById'],
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