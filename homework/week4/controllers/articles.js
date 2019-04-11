/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const operations = require('../operations/articles')
const { validate } = require('../validations')
const schema = require('../validations/schemas/articles')

async function getAll(ctx) {
  ctx.body = await operations.getAllCollect()
}

async function create(ctx) {
  const newArticle = {
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }

  validate(schema.article, newArticle)

  ctx.body = await operations.create(ctx.request.body)
}

module.exports = {
  getAll,
  create,
}
