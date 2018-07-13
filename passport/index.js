const passport = require('passport')
const OneauthStrategy = require('passport-oneauth').Strategy
const v4 = require('uuid/v4')

const DB = require('../models')
const config = require('../config/config.json')

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
    oneauth_id: profile.id,
    role: profile.role === 'admin' ? 'ADMIN': 'USER'
  })

  const user = await DB.users.findOne({
    where: {
      oneauth_id: profile.id
    }
  })

  const session = await DB.sessions.create({
    key: v4(),
    userId: user.id
  })

  cb(null, user.get({plain: true}))
}))



module.exports = passport