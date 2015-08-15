#!/usr/bin/env node

/**
 * configuring this file to be able to run virtual hosts on gandi
 *
 * */


var debug = require('debug')('WeddingWebsiteDynamic');
//var app = require('./app');

var express = require('express');

var app = express();
var vhost = require( 'vhost' );

app.set('port', process.env.PORT || 8080);


var KSApp = require('./siteKS/appKS.js');
var SJApp = require('./siteSJ/appSJ.js');

app.use(vhost('kevinandsamantha.ca', KSApp));
app.use(vhost('shinuandjustin.com', SJApp));

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
