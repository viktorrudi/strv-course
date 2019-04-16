'use strict'

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
  userEmailLookup,
  userLogin,
  userSignup,
}
