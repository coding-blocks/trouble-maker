const { default: Whisperer } = require('@coding-blocks/whisperer');
const config = require('../../config/config');

class WhispererService {
  constructor(connectionParams) {
    this._whisperer = new Whisperer({
      ...connectionParams
    })
  }

  initialize() {
    return this._whisperer.init()
  }

  emit(topic, msg) {
    this._whisperer.emit(topic, msg)
  }
}

module.exports = new WhispererService({
  host: config.RABBITMQ.host,
  port: config.RABBITMQ.stompPort,
  username: config.RABBITMQ.login,
  password: config.RABBITMQ.password
})
