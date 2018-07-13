const passport = require('./index')

module.exports = {
  adminOnly (req, res, next) {
    if (req.user.role === 'ADMIN') {
      next()
    } else {
      res.send(401)
    }
  }
}