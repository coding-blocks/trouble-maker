const DB = require('../models')

DB.sequelize.sync({
  force: true
}).then(() => console.log('Done'))