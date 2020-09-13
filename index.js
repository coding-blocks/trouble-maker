require('newrelic')
const express = require('express')
const morgan = require('morgan')
const Raven = require('raven')

const passport = require('./passport')

const app = express()
const config = require('./config/config')
const DB = require('./models')
const routes = require('./routes')
const { expressLogger } = require('./utils/logger')

// Import with polyfills
if (typeof TextEncoder !== 'function') {
  const TextEncodingPolyfill = require('text-encoding');
  TextEncoder = TextEncodingPolyfill.TextEncoder;
  TextDecoder = TextEncodingPolyfill.TextDecoder;
}
const WhispererService = require('./services/whisperer')

Raven.config(config.SENTRY_DSN).install()

app.use(require('cookie-parser')());
app.use(require('body-parser').json({
  limit: '100mb',
  type: 'application/vnd.api+json'
}));
app.use(require('body-parser').json({
  limit: '100mb',
  type: 'application/json'
}));

app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())

app.use(expressLogger)
app.use(routes)

app.use(function onError(err, req, res, next) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // if env is dev; just print error to console 
    console.error(err)
    res.status(500).json(err)
  } else {
    next(...arguments)
  }
}, Raven.errorHandler())

DB.sequelize.sync().then(async () => {
  try {
    await WhispererService.initialize()
  } catch(err) {
    console.log(err)
  }
  const port = process.env.PORT || '8080'
  app.listen(port, () => console.log('Listening on ', port))
})