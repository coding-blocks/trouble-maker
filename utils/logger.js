const Winston = require ('winston'),
      ExpressWinston = require ('express-winston'),
      WinstonGraylog2 = require ('winston-graylog2')
;

const GRAYLOG_HOST = process.env.GRAYLOG_HOST || 'evil.com',
  GRAYLOG_PORT = process.env.GRAYLOG_PORT || 12201,
  NODE_ENV = process.env.NODE_ENV || 'development'
;

const GrayLogger = new WinstonGraylog2 ({
  name: 'troublemaker-backend',
  level: 'debug',
  silent: false,
  handleExceptions: true,

  prelog: function (msg) {
    return msg.trim ()
  },

  graylog: {
    servers: [{ host: GRAYLOG_HOST, port: GRAYLOG_PORT }],
    facility: 'troublemaker-backend',
    bufferSize: 1400
  },

  staticMeta: {
    env: NODE_ENV
  }
})

const expressLogger = ExpressWinston.logger ({
  transports: [GrayLogger],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false
})

module.exports.expressLogger = expressLogger
