var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
//var users = require('./routes/users');
var weddingAPI = require('./routes/weddingAPI');

var app = express();

//mongoose.connect('mongodb://localhost:27017/sjweddingdb');
var sjweddingdb = mongoose.createConnection('mongodb://localhost:27017/sjweddingdb');
var dbModels={};

dbModels.dbModelPollQuestions = sjweddingdb.model('pollquestions',{
    imgSrc: String,
    Q: String,
    A1: String,
    A2: String,
    A3: String,
    A4: String,
    A5: String,
    C: String
});


dbModels.dbModelPollResults = sjweddingdb.model('pollresults',{
    QID: mongoose.Schema.ObjectId,
    A: String,
    C: String,
    resultDate: String,
    requestIp:String
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/', weddingAPI(sjweddingdb,dbModels));
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    //sendfile('./public/index.html');
    res.sendFile('/public/index.html', { root: __dirname });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
