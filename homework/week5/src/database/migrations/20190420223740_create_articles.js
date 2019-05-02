/* eslint-disable func-names */
/* eslint-disable import/group-exports */
'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id').primary()
    table.string('title')
    table.text('text')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
}
