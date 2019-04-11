'use strict'

const uuid = require('uuid')
const articles = require('../database/articles.json')

// GET all
function findAll() {
  return articles
}

// POST
function create(article) {
  // Creates ID for the new article
  article.id = uuid.v4()
  // Pushes the article into the database (array)
  articles.push(article)
  // Shows the article created in the API response body
  return article
}

module.exports = {
  findAll,
  create,
}
