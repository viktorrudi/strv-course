'use strict'

const { Model } = require('objection')

class Article extends Model {
  static get tableName() {
    return 'article'
  }
}

module.exports = Article
