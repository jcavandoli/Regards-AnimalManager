var express = require('express');
var http = require('http');
var path = require('path');
var nStore = require('nStore');
var app = express();

app.configure(function() {
    app.set('port', 3000);
});

// Mount static
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../.tmp')));

app.use(express.json());
app.use(express.bodyParser());
app.use(express.errorHandler({
  dumpExceptions:true,
  showStack:true
}));
app.use(app.router);

// Define routes
require('./routes.js')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});



