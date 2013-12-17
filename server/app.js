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
    ;

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config.js')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file);
})


var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || config.port);
    app.set('views', path.join(__dirname, './app/views/'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    // vvvvvvvvv begin multipart, used for file upload
    app.use(express.multipart());
    // ^^^^^^^^^ end multipart
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../client')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Bootstrap http server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
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
