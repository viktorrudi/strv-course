'use strict'

const articleID = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'string',
      required: true,
    },
  },
  additionalProperties: false,
}

const article = {
  type: 'Object',
  required: true,
  properties: {
    title: {
      type: 'string',
      required: true,
    },
    text: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = {
  articleID,
  article,
}
