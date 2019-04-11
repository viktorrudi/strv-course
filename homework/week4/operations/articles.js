/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const articleRepo = require('../repositories/articles')

function getAllCollect() {
  // Returns all found articles collected from database (array) to be used in operations
  return articleRepo.findAll()
}

function create(input) {
  return articleRepo.create(input)
}

module.exports = {
  getAllCollect,
  create,
}
