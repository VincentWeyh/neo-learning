var express = require('express'),
    _ = require('lodash'),
    cors = require('cors'),
    // errorHandler = require('error-handler'),
    DB = require('./models');
    passport = require('passport');
    bodyParser = require('body-parser');

//  bodyParser = require('body-parser'),
  routers = require('./routes'),
//  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

 global.url = 'http://localhost';
//global.url = 'http://192.168.85.1';
//global.url ='http://34.248.83.191';
global.dbUrl = '127.0.0.1';
// global.dbUrl = 'db';

var authController = require('./auth');


var app = module.exports = express();

global.app = app;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors())
app.use(passport.initialize());

var env = process.env.NODE_ENV || 'development';

/**
 * Routes
 */

app.use('/', require('./chat'));
app.use('/', require('./board'));

routers.forEach(router => {
  if(_.isFunction(router)) {
    app.use('/', router);
  }
});

/**
 * Start Server
 */
app.listen('7029');
