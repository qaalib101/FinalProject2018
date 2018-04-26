var passport = require('passport');
var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.local.username;
        next();
    } else {
        res.redirect('/')
    }
}
router.use(isLoggedIn);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth');
});

/*Add a new task*/
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/account',
        failureRedirect: '/',
        failureFlash: true
    }));
router.post('/account', function(err, req, res, next){
    Profile.find({username: req.user.local.username})
.then((doc) => {
            res.render('account', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/signup', function(req, res, next){
    res.render('signup')
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/auth')
});

router.post('/makeProfile',passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}), function(req, res, next) {

    var user = Profile(req.body);
    user.local = {
        username: req.body.username,
        password: req.body.password
    };
    for(var x = 0; x < req.body.languages.length; x++){
        user.languages.push(req.body.languages[x]);
    }
    for(var y = 0; y < req.body.languages.length; y++){
        user.skills.push(req.body.languages[x]);
    }
    user.save()
        .then((doc) => {
            console.log(doc);
            res.render('/account', {user: doc});
        })
        .catch((err) => {
            next(err);
        });
});
/*delete the specific tasks*/
router.post('/delete', function(req, res, next){

    Profile.findOneAndRemove( {_id: req.body._id, _creator: req.user._id}, {completed: true, dateDeleted: new Date()} )
        .then( (task) => {
            console.log(task);
            console.log(req.body);
            console.log(req.user);
            if (!task)  { // No task deleted, therefore the ID is not valid,
                //or did not belong to the current logged in user.
                res.status(403).send('This is not your task!');
            }
            else {
                res.redirect('/completed');
                req.flash('info', 'Profile deleted');
            }
        })
        .catch( (err) => {
            next(err);
        });

});
/*marks all the tasks as done*/
router.post('/alldone', function(req, res, next){

    Profile.update( {_creator: req.user, completed: false}, {completed: true, dateCompleted: new Date()}, {multi: true})
        .then( (result) => {
            req.flash('info', 'All tasks are done!');
            res.redirect('/')
        })
        .catch( (err) => {
            next(err);
        });
});
/*getting a specific page per task*/
router.get('/task' + '/:_id', function(req, res, next){
    Profile.findById(req.params._id).then( (task) => {

        if (!task) {
            res.status(404).send('Profile not found.');
        }

        // Verify that this task was created by the currently logged in user
        else if (!task._creator.equals(req.user._id)) {
            res.status(403).send('This is not your task!');  // 403 Unauthorized
        }

        else {
            res.render('task_detail', {task:task})
        }

    }).catch( (err) => {
        next(err);
    });
});
/*delete all the completed task in the completed page*/
router.post('/deleteDone', function(req, res, next){
    Profile.deleteMany({_creator: req.user, completed:true})
        .then(()=>{
            req.flash('info', 'All completed tasks deleted');
            res.redirect('/');
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
