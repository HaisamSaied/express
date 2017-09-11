var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//mongodb connection
var db = mongoose.connection;
var uri = "mongodb://localhost:5000/";

mongoose.Promise = global.Promise;
mongoose.connect(uri, {useMongoClient: true})
.then(({db: {databaseName}}) => console.log(`Connected to ${databaseName}`))
.catch(err => console.error(err));

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   console.log('connected to mongodb database');
// });

db.on('disconnected', function () {
   //Reconnect on timeout
   if (process.env.NODE_EN==="production") {
     mongoose.connect(process.env.MONGODB_URI);
     db = mongoose.connection;
   } else {
     mongoose.connect(process.env.MONGODB_DEV_URI);
     db = mongoose.connection;
   }
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
