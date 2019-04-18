/* eslint-disable no-warning-comments */
'use strict'

// TODO: Set up jwtToken schema
const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: {
      type: 'string',
      required: true,
    },
  },
}

const userEmailLookup = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'string',
      required: true,
      minimum: 0,
      maximum: 10000,
    },
  },
}

const userLogin = {
  type: 'Object',
  required: true,
  properties: {
    email: {
      type: 'string',
      format: 'email',
      required: true,
      maxLength: 100,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 100,
    },
  },
}


const userSignup = {
  type: 'Object',
  required: true,
  properties: {
    name: {
      type: 'string',
      required: false,
      maxLength: 100,
    },
    email: {
      type: 'string',
      format: 'email',
      required: true,
      maxLength: 100,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 100,
    },
  },
}

module.exports = {
  jwtToken,
  userEmailLookup,
  userLogin,
  userSignup,
}
