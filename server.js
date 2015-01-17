/**
 * Created by Daniel on 1/17/2015.
 */
// load the things we need
var express = require('express'),
    compression = require('compression'),
    config = require('./config'),
    app = express();

// Express uses
app.use(compression()); // Compression (Gzip)
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index/home page
app.get('/', function (req, res) {
    res.render('pages/index', config);
});

app.listen(80);
console.log('Express.js server is listening on http://localhost:80');