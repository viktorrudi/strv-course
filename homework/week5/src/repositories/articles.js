/* eslint-disable no-warning-comments */
'use strict'

// const articles = require('../database/articles.json')
const Article = require('../database/models/article')
const error = require('../utils/errors')

// READ - GET all
function findAll() {
  return Article
    .query()
}

// READ - GET :id
function findById(id) {
  const article = Article
    .query()
    .where('id', id)
    .first()
  if (!article) {
    throw new error.NotFoundError()
  }
  return article
}

// CREATE - POST
function create(article) {
  return Article
    .query()
    .upsertGraphAndFetch({
      ...article,
    })
}

// TODO: Update below with proper DB commands

// // UPDATE - PUT
// function put(input) {
//   const idRequest = parseInt(input.id)

//   // Look for matching ID in database. If found, update.
//   for (let i = 0; i < articles.length; i++) {
//     if (articles[i].id === idRequest) {
//       articles[i].title = input.title
//       articles[i].text = input.text
//       return articles[i]
//     }
//   }

//   // If no match was found, return false for error handling
//   return false
// }

// // UPDATE - PATCH
// function patch(input) {
//   const idRequest = parseInt(input.id)

//   for (let i = 0; i < articles.length; i++) {
//     if (articles[i].id === idRequest) {
//       articles[i].title = input.title ? input.title : articles[i].title
//       articles[i].text = input.text ? input.text : articles[i].text
//       return articles[i]
//     }
//   }
//   return false
// }

// function deleteArticle(id) {
//   const idRequest = parseInt(id)
//   const index = articles.findIndex(article => article.id === idRequest)
//   if (index === -1) {
//     return false
//   }

//   // Update database with removed object
//   articles.splice(index, 1)
//   // Send message back to client
//   return {
//     message: 'Article successfully deleted.',
//     articles,
//   }
// }

module.exports = {
  findAll,
  findById,
  create,
  // put,
  // patch,
  // deleteArticle,
}
