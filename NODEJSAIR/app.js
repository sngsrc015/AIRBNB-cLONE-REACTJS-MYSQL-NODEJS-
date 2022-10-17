var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var errorHandler=require('./routes/config/error-handler');
var jwt=require('./routes/config/jwt')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stateRouter = require('./routes/state');
var amenitiesRouter = require('./routes/Amenities');
var typesRouter = require('./routes/Types');
var propertyRouter = require('./routes/Property');
var loginRouter = require('./routes/Login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use(jwt())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/states', stateRouter);
app.use('/amenities', amenitiesRouter);
app.use('/types', typesRouter);
app.use('/property', propertyRouter);
app.use('/log', loginRouter);




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


app.use(errorHandler)
module.exports = app;
