/* eslint-disable no-warning-comments */
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

  // Todo: fix validation. Doesn't do anything now
  validate(schema.article, newArticle)
  // If validation is successfull, send the whole body
  ctx.body = await operations.create(ctx.request.body)
}

module.exports = {
  getAll,
  create,
}
