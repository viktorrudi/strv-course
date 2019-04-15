/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const errors = require('../utils/errors')
const articleRepo = require('../repositories/articles')

function getAllCollect() {
  // Returns all found articles collected from database (array) to be used in operations
  return articleRepo.findAll()
}

function getById(id) {
  const article = articleRepo.findById(id)
  if (!article) {
    throw new errors.NotFoundError('Incorrect ID. Couldn\'t find article.')
  }
  // Returns article with matching id
  return article
}

function createFrom(input) {
  return articleRepo.create(input)
}

function put(input) {
  const article = articleRepo.put(input)
  if (!article) {
    throw new errors.NotFoundError('Object to update not found')
  }
  return article
}

function patch(input) {
  const article = articleRepo.patch(input)
  if (!article) {
    throw new errors.NotFoundError('Object to patch not found')
  }
  return article
}

function deleteArticle(id) {
  const article = articleRepo.deleteArticle(id)
  if (!article) {
    throw new errors.NotFoundError('Object to delete not found')
  }
  return article
}

module.exports = {
  getAllCollect,
  getById,
  createFrom,
  put,
  patch,
  deleteArticle,
}
