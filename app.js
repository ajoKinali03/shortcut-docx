// evan-buss.font-switcher


let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// app.set('/public', path.join(__dirname, '/public/'));
app.use(express.static(path.join(__dirname, 'public')));

// ads.txt untuk google adsense
app.use('/ads.txt', (req, res) => {
  res.sendFile(path.join(__dirname, './ads.txt'));
});


// set limit file input
const limit = "100mb"
app.use(express.json({limit: limit}));
app.use(express.urlencoded({ extended: true, limit: limit, parameterLimit: 100000 }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
console.log('web bejalan pada http://localhost:3000');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
