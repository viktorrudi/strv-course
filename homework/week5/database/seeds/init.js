/* eslint-disable func-names */
'use strict'

const articlesData = require('./articles.json')

// [QUESTION] How does this work? ESLint is not too happy with it
// Why include the Promise argument?
// Is this the same as doing 'const seed = func...' - module.exports = {seed}?

exports.seed = function(knex, Promise) {
  return knex('articles').del()
    .then(() => knex('articles').insert(articlesData))
}

// How would this be writte in async/await syntax? Like this?
//
// async function seed(knex, Promise) {
//   await knex('articles').del()
//   return await articles.insert(articlesData)
// }
//
// module.exports = { seed }
