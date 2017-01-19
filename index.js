var express = require('express'),
    _ = require('lodash'),
    // errorHandler = require('error-handler'),
    DB = require('./server/models');
    passport = require('passport');
    bodyParser = require('body-parser');

//  bodyParser = require('body-parser'),
  routers = require('./server/routes'),
//  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var authController = require('./server/auth');


var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(morgan('dev'));
// app.use(bodyParser());
// app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  //app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

routers.forEach(router => {
  if(_.isFunction(router)) {
    app.use('/', router);
  }
});


// serve index and view partials
//app.get('/', routes.index);
//app.get('/partials/:name', routes.partials);

// JSON API
//app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


/**
 * Start Server
 */
app.listen('7029');
