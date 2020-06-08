var express = require('express');
var router = express.Router();
// var server = require('./app');
// var io = require('socket.io')(server);


router.post('/message', function(res, req, next){
	return 'Hello'
});

router.get('/messaging', function(res, req, next){
	res.render('messaging/main-messaging');
});

module.exports = router;