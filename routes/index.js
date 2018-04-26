var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username;
        next();
    } else {
        res.redirect('/auth')
    }
}
router.use(isLoggedIn);

/* GET home page. */
router.get('/', function(req, res, next) {
    Profile.find({username: req.user.username})
        .then((doc) => {
            res.render('account', {user: doc})
        });
});

router.get('/makeProfile', function(err, req, res, next){
    Profile.find({username: req.user.username})
.then((doc) => {
            res.render('signup', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/makeProfile', function(req, res, next) {


    Profile.findOneAndUpdate({username: req.body.username}, {$set:{status: req.body.status}},
        { $push: { languages: { $each: [req.body.languages], $sort: -1 },
                skills: { $each: [req.body.skills]} } }).save()
        .then((doc) => {
            console.log(doc);
            res.render('/account', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
