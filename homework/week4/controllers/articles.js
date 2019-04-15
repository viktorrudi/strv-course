/* eslint-disable no-warning-comments */
/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const operations = require('../operations/articles')
const { validate } = require('../validations')
const schema = require('../validations/schemas/articles')

async function getAll(ctx) {
  ctx.body = await operations.getAllCollect()
}

async function getById(ctx) {
  const id = await parseInt(ctx.params.id)
  ctx.body = await operations.getById(id)
}

async function create(ctx) {
  const newArticle = {
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }

  // Todo: fix validation. Doesn't do anything now
  validate(schema.article, newArticle)
  // If validation is successfull, send the whole body
  ctx.body = await operations.createFrom(ctx.request.body)
}

async function put(ctx) {
  const updArticle = {
    id: ctx.params.id,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }
  ctx.response.body = await operations.put(updArticle)
}

async function patch(ctx) {
  const patchArticle = {
    id: ctx.params.id,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }
  ctx.response.body = await operations.patch(patchArticle)
}

async function deleteArticle(ctx) {
  const id = await parseInt(ctx.params.id)
  ctx.body = await operations.deleteArticle(id)
}

module.exports = {
  getAll,
  getById,
  create,
  put,
  patch,
  deleteArticle,
}
