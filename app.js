var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongo')(session);
var passport = require('passport');
var passportConfig = require('./config/authentication')(passport);




var db_url = process.env.MONGO_URL;
var project_url = process.env.PROJECT_URL;
mongoose.connect(db_url)
    .then(() => {console.log('Connected to swerveDB');})
    .catch((err) => {console.log('Error connecting to mLab', err); });
const db = mongoose.connection

var auth = require('./routes/auth');
var users = require('./routes/users');
var index = require('./routes/index');




var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'), exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({secret: 'top secret', resave: false, saveUninitialized: false}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));


var store = new MongoDBStore({mongooseConnection: db});
app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true,
    store:store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    if(err.kind === 'ObjectId' && err.name == 'CastError'){
        err.status = 404;
        err.message = "ObjectId Not Found";
        console.log(err.trace);
    }
    if(err.name == 'NotFoundError'){
        err.status = 404;
        err.message = " Not Found";
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('base/error');
});

module.exports = app;
