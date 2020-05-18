'use strict'

var mongoose = require('mongoose')

var BlueBird = require('bluebird')

var url = process.env.MONGO_URL

BlueBird.promisifyAll(mongoose)

module.exports.up = next => {
	return mongoose.connect(url)
	.then((connection)=>(
		new mongoose.Schema({
			name: String,
    		githubLink: String,
    		status: String,
    		description: String,
    		creator: {type: ObjectId, ref: 'User'}})
	).then(()=>{
		new mongoose.Schema({
    		username: String,
    		password: String,
    		status: String,
    		languages: [],
    		skills: [],
    		projects: [ { type : ObjectId, ref : 'Project' } ]})
	}).catch((err)=> {
		console.log(err)
	})

}

module.exports.down = function (next) {
  next()
}
