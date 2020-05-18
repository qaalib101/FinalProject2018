/**
 * Created by si8822fb on 4/24/2018.
 */

var mongoose = require('mongoose');
var User = require('./credentials');
var ObjectId = mongoose.Schema.Types.ObjectId;

// created a one to one relationship with user
var projectSchema = new mongoose.Schema({
    name: String,
    githubLink: String,
    status: String,
    description: String,
    creator: {type: ObjectId, ref: 'User'}
});

var Project = mongoose.model('Project', projectSchema, 'project');


module.exports = Project;
