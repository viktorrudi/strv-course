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
  const input = { id }
  validate(schema.articleID, input)
  ctx.body = await operations.getById(id)
}

async function create(ctx) {
  const newArticle = {
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }

  validate(schema.article, newArticle)
  // If validation is successful, send the whole request body
  ctx.body = await operations.createFrom(ctx.request.body)
}

async function put(ctx) {
  const id = await parseInt(ctx.params.id)
  const input = { id }
  const updArticle = {
    id,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }

  validate(schema.articleID, input)
  validate(schema.article, updArticle)
  ctx.response.body = await operations.put(updArticle)
}

async function patch(ctx) {
  const id = await parseInt(ctx.params.id)
  const input = { id }
  const patchArticle = {
    id: ctx.params.id,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }
  validate(schema.articleID, input)
  validate(schema.aritcleOptional, patchArticle)
  ctx.response.body = await operations.patch(patchArticle)
}

async function deleteArticle(ctx) {
  const id = await parseInt(ctx.params.id)
  const input = { id }
  validate(schema.articleID, input)
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
