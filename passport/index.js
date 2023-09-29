const passport = require('passport')
const OneauthStrategy = require('passport-oneauth').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy;

const v4 = require('uuid/v4')

const DB = require('../models')
const config = require('../config/config')

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new OneauthStrategy({
  clientID: config.ONEAUTH.clientID,
  clientSecret: config.ONEAUTH.clientSecret,
  callbackURL: config.ONEAUTH.callbackURL,
},
async function (acessToken, refreshToken, profile, cb) {
  await DB.users.upsert({
    firstname: profile._json.firstname,
    lastname: profile._json.lastname,
    email: profile.email,
    oneauth_id: profile.id
  })

  const user = await DB.users.findOne({
    where: {
      oneauth_id: profile.id
    }
  })

  const session = await DB.sessions.create({
    key: v4(),
    userId: user.id
  }, {
    returning: true
  })

  cb(null, session.get({plain: true}))
}))

passport.use(new BearerStrategy(async function (token, cb) {
  const apiKey = await DB.sessions.findOne({
    where: {
      key: token
    },
    include: DB.users
  })

  
  if(apiKey) {
    cb(null, apiKey.user)
  } else {
    cb(null, false)
  }
}))

passport.use('api-bearer', new BearerStrategy(async function(token, cb){
  const key = await DB.keys.findOne({ where: { key: token }, include: {model: DB.users}})
  if(!!key) {
    cb(null, key.user)
  } else {
    cb(null, false)
  }
}))



module.exports = passport