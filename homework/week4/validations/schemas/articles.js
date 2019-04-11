'use strict'

const articleID = {
  type: 'Object',
  required: ['id'],
  additionalProperties: 'false',
  properties: {
    id: {
      type: 'string',
      min: 1,
      max: 10000,
    },
  },
}

const article = {
  type: 'Object',
  required: ['title', 'text'],
  additionalProperties: 'false',
  properties: {
    title: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
  },
}

module.exports = {
  articleID,
  article,
}
