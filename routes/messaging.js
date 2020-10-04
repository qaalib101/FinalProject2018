var express = require('express');
var router = express.Router();
// var server = require('./app');
// var io = require('socket.io')(server);

router.get('/', function(req, res, next){
	res.render('messaging/main-messaging');
});

module.exports = router;