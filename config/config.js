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
    "dialect": "postgres"
  },
  "production": {
    "username": reqFromEnv('DB_USER'),
    "password": reqFromEnv('DB_PASS'),
    "database": reqFromEnv('DB_NAME'),
    "host": reqFromEnv('DB_HOST'),
    "dialect": "postgres"
  },
  "ONEAUTH": {
    "clientID": reqFromEnv("ONEAUTH_CLIENTID", "2636937167"),
    "clientSecret": reqFromEnv("ONEAUTH_CLIENTSECRET", "EphV9Fx8ZdCfmMAVZfJsUqEtvNVDTdqNcpiInuQ0Y4cmq2ZDMHqiQBBC9sUtazPS"),
    "callbackURL": reqFromEnv("ONEAUTH_CALLBACKURL", "http://localhost:4200/callback")
  },
  "SENTRY_DSN": reqFromEnv("SENTRY_DSN", "http://totallyWrongDSN:WillNotWork@sentry.somedomain.com/1")
}
