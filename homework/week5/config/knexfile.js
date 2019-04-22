'use strict'

const path = require('path')
const config = require('../config/default')

module.exports = {
  client: 'pg',
  // user: 'postgres',
  // password: 'postgres',
  connection: config.db.uri,
  // [QUESTION] What does this do?
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
