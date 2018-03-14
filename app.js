'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwtVerify = require('./middleware/jwt_verify');

const Membership = require('./modules/membership/model/membership');
const MembershipRepository = require('./modules/membership/repository/membership_repository');
const membershipHandler = require('./modules/membership/handler/handler');

// fake membership db
let db = new Map();
db.set(1, new Membership(1, 'Wuriyanto', 'Musobar', 'wuriyanto@yahoo.co.id', '123456'));
db.set(2, new Membership(2, 'Alex', 'Xander', 'alex@yahoo.co.id', '123456'));

const membershipRepository = new MembershipRepository(db);

app.post('/auth', membershipHandler.login(membershipRepository));

app.get('/me',jwtVerify('secret'), membershipHandler.getMe(membershipRepository));

app.get('/', (req, res, next) => {
  res.send('Hello Express');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
  res.send('error');
});

module.exports = app;
