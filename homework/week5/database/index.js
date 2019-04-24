'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('../config/knexfile')

const start = async () => {
  // Specific implementation by this package (instead of using new kw)
  const knex = Knex(knexConfig)

  try {
    await knex.raw("Select 'test connection';")

    Model.knex(knex)
  } catch (error) {
    throw error
  }
}

// [QUESTION] What does exports.start = start do.
// Why not just do module.exports = start?
module.exports.start = start
