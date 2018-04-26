var express = require('express');
var router = express.Router();
var passport = require('passport');
var Profile = require('../models/credentials');

/* GET users listing. */
router.get('/users', function(err, req, res, next){
  console.log(req.user);
    Profile.find({username: req.user.username})
        .then((doc) => {
            res.render('signup', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/makeProfile', function(req, res, next) {
    Profile.findOneAndUpdate({username: req.body.username}, {$set:{status: req.body.status,
            languages: [req.body.languages],
                skills: [req.body.skills]} }).save()
        .then((doc) => {
            console.log(doc);
            res.render('/account', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});
router.post('/editProfile', function(req, res, next){
    Profile.findOneAndUpdate(
        {username: req.user.username},
        {$set: {status: req.body.status,
                    languages: [req.body.languages],
                        skills: [req.body.skills]}})
        .then((doc) => {
                res.render('account', {user: doc})
            }
        );
});

module.exports = router;
