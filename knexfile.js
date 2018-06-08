// Update with your config settings.

let connectionString = process.platform === 'win32' ? 'postgres://postgres:root@localhost/lofo' : 'postgres://localhost/lofo'
module.exports = {

  development: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      director: __dirname + '/db/seeds',
    },
    pool: {
      min: 1,
      max: 4
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || connectionString,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/production',
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};
