'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('questionsTags', {
      fields: ['questionId', 'tagId'],
      name: 'questionsTags_questionId_tagId_partial',
      unique: 'id',
      where: {
        deletedAt: null
      }
      
    });
    
    await queryInterface.removeConstraint('questionsTags', 'questionsTags_questionId_tagId_key')
    
  },
  
  down: (queryInterface, Sequelize) => {
  }
};
