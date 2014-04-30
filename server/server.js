/**
 * Created by theotheu on 27-10-13.
 */

/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , connect = require('connect')
    , morgan = require('morgan')
    , methodOverride = require('method-override')
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , favicon = require('static-favicon')
    ;

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config.js')[env];


// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);

// Set debugging on/off
if (config.debug) {
    mongoose.set('debug', true);
} else {
    mongoose.set('debug', false);
}

// Bootstrap models
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file);
})


var app = express();

app.listen(process.env.PORT || config.port);    // listen on the configured port number
app.use(favicon(__dirname + '/public/favicon.ico'));
if (env === 'development') {
    app.use(morgan('dev')); 					// log every request to the console
}

app.use(connect.multipart());

app.use(methodOverride()); 					    // simulate DELETE and PUT
app.use(cookieParser());                        // required before session.
app.use(session({ secret: 'keyboard cat', key: 'sid'}));    // https://github.com/expressjs/session/blob/master/README.md
app.use(express.static(path.join(__dirname, '../client')));

/*
app.configure(function () {
//   app.set('port', process.env.PORT || config.port);
//   app.use(express.favicon());
//  app.use(express.logger('dev'));
//   app.use(express.json());
//  app.use(express.urlencoded());
    // vvvvvvvvv begin multipart, used for file upload
    app.use(express.multipart());
    // ^^^^^^^^^ end multipart
//  app.use(express.methodOverride());
//  app.use(express.cookieParser('your secret here'));
//  app.use(express.session());
//  app.use(app.router);
    app.use(express.static(path.join(__dirname, '../client')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});
*/
// Bootstrap http server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + config.port);
});

// Bootstrap routes
var routes_path = __dirname + '/routes'
    , route_files = fs.readdirSync(routes_path);
route_files.forEach(function (file) {
    require(routes_path + '/' + file)(app);
})

// Last line to serve static page
console.log('last resort');
app.use(express.static(__dirname + '../client/'));
