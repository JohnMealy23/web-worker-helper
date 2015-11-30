var express = require('express');
var app = express();
var path = require("path");
var server = app.listen(8080, function () {
    console.log('Listening on port %d', server.address().port);
});

app.use(express.static('public'));




