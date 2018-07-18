const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')


const passport = require('./passport')
const session = require('express-session')

const app = express()
const config = require('./config/config.json')
const DB = require('./models')
const routes = require('./routes')

app.use(require('cookie-parser')());
app.use(require('body-parser').json({
  limit: '100mb',
  type: 'application/vnd.api+json'
}));
app.use(require('body-parser').json({
  limit: '100mb',
  type: 'application/json'
}));
app.use(session({
  secret: 'inthepromiseblouse',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true } // for production only
}))
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

DB.sequelize.sync().then(() => {
  const port = config.PORT || '8080'
  app.listen(port, () => console.log('Listening on ', port))
})