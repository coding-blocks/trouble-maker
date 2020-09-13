const reqFromEnv = (val, def) => process.env[val] || def

module.exports = {
  "development": {
    "username": "troublemaker",
    "password": "willNotWork",
    "database": "troublemaker",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": reqFromEnv('DB_USER'),
    "password": reqFromEnv('DB_PASS'),
    "database": reqFromEnv('DB_NAME'),
    "host": reqFromEnv('DB_HOST'),
    "dialect": "postgres",
    "logging": false
  },
  "ONEAUTH": {
    "clientID": reqFromEnv("ONEAUTH_CLIENTID", "2636937167"),
    "clientSecret": reqFromEnv("ONEAUTH_CLIENTSECRET", "EphV9Fx8ZdCfmMAVZfJsUqEtvNVDTdqNcpiInuQ0Y4cmq2ZDMHqiQBBC9sUtazPS"),
    "callbackURL": reqFromEnv("ONEAUTH_CALLBACKURL", "http://localhost:4200/callback")
  },
  "RABBITMQ": {
    "host": reqFromEnv("RABBITMQ_HOST", "localhost"),
    "login": reqFromEnv("RABBITMQ_LOGIN", "guest"),
    "password": reqFromEnv("RABBITMQ_PASS", "guest"),
    "stompPort": reqFromEnv("RABBITMQ_STOMP_PORT", "15674")
  },
  "SENTRY_DSN": reqFromEnv("SENTRY_DSN", "http://totallyWrongDSN:WillNotWork@sentry.somedomain.com/1")
}
