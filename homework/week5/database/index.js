'use strict'

const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('../config/knexfile')

const start = async () => {
  // [QUESTION] Why are we not creating instance of Knex (new KW)
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
