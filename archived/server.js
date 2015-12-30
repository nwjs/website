/**
 * Created by Daniel on 1/17/2015.
 */
// load the things we need
var express = require('express'),
    compression = require('compression'),
    config = require('./config'),
    fs = require('fs'),
    marked = require('marked'),
    app = express();

var port = process.env.PORT || 8080;

// Express uses
app.use(compression()); // Compression (Gzip)
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Function for rendering Markdown file
var markdown = function (filename) {
    var markdownFile = fs.readFileSync(__dirname + '/views/docs/' + filename, 'utf8');
    markdownFile = marked(markdownFile);

    return markdownFile;
};

// index/home page
app.get('/', function (req, res) {
    res.render('pages/index', config);
});

app.get('/download', function(req, res) {
    res.render('pages/download', config);
});

app.get('/blog', function(req, res) {
    res.render('pages/blog', config);
});

app.get('/quickstart', function(req, res) {
    res.render('pages/quickstart', {markdown: markdown});
});

app.get('/docs', function(req, res) {
    res.render('pages/docs', config);
});

app.listen(port);
console.log('Express.js server is listening on http://localhost:' + port);