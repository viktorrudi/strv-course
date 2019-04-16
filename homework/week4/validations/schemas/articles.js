/* eslint-disable no-warning-comments */
'use strict'

const articleID = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'integer',
      required: true,
      minimum: 0,
      maximum: 10000,
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

const aritcleOptional = {
  type: 'Object',
  required: false,
  properties: {
    title: {
      type: 'string',
      required: false,
    },
    text: {
      type: 'string',
      required: false,
    },
  },
}

module.exports = {
  articleID,
  article,
  aritcleOptional,
}
