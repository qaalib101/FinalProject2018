var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('auth');
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/auth',
    failureFlash: true
}));
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/auth',
    failureFlash: true
}));
router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/')
});

module.exports = router;