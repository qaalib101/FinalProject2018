'use strict'

var mongoose = require('mongoose')

var BlueBird = require('bluebird')

var project = require('../models/project')
var user = require('../models/credentials')

var url = process.env.MONGO_URL

BlueBird.promisifyAll(mongoose)

module.exports.up = function (next) {
    project.
}

module.exports.down = function (next) {
  next()
}
