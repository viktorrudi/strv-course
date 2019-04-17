/* eslint-disable no-warning-comments */
'use strict'

const users = require('../database/users')

// Read - Get all users
function findAll() {
  return users
}

// Read - GET /id
function findByEmail(email) {
  return users.find(user => user.email === email)
}

// Create user - POST
function create(user) {
  user.id = users.length + 1
  users.push(user)
  return user
}

// Update - PUT
// TODO: Needs fixing
function put(input) {
  const idRequest = parseInt(input.id)

  // Look for matching ID in database. If found, update.
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === idRequest) {
      users[i].email = input.email
      users[i].password = input.password
      return users[i]
    }
  }

  // If no match was found, return false for error handling
  return false
}

// UPDATE - PATCH
// TODO: Needs fixing
function patch(input) {
  const idRequest = parseInt(input.id)

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === idRequest) {
      users[i].email = input.email ? input.email : users[i].email
      users[i].password = input.password ? input.password : users[i].password
      return users[i]
    }
  }
  return false
}

// Delete - Remove user
function deleteUser(id) {
  const idRequest = parseInt(id)
  const index = users.findIndex(user => user.id === idRequest)
  if (index === -1) {
    return false
  }

  // Update database with removed object
  users.splice(index, 1)
  // Send message back to client
  return {
    message: 'User successfully deleted.',
  }
}


module.exports = {
  findAll,
  findByEmail,
  create,
  put,
  patch,
  deleteUser,
}
