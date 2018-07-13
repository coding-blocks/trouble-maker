const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')


const passport = require('./passport')
const session = require('express-session')

const app = express()
const config = require('./config/config.json')
const DB = require('./models')
const routes = require('./routes')

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: 'inthepromiseblouse',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true } // for production only
}))
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true
    res.locals.user = req.user
  }

  next()
})
app.use(routes)

DB.sequelize.sync().then(() => {
  const port = config.PORT || '8080'
  app.listen(port, () => console.log('Listening on ', port))
})