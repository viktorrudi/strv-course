'use strict'

const path = require('path')
const config = require('../config/default')

module.exports = {
  client: 'pg',
  user: 'docker',
  password: 'docker',
  connection: config.db.uri,
  // A pool for how many connections to the DB that are accepted
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, './../database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './database/seeds'),
  },
}
