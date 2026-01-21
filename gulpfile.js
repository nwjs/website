'use strict';

var path = require('path');
var gulp = require('gulp');
var run = require('gulp-run');
var st = require('st');
var http = require('http');

gulp.task('build', function(cb) {
    run(__dirname + '/node_modules/.bin/metalsmith')
    .exec(cb);
});

gulp.task('watch', function() {
    gulp.watch(['metalsmith.json', 'src/**/*', 'public/**/*', 'templates/**/*'],gulp.parallel('build'));
});

gulp.task('serve', gulp.series('build', gulp.parallel('watch', function() {
    http.createServer(st({
        path: path.join(__dirname, 'build'),
        index: 'index.html',
        cache: false
    })).listen(3000);
})));

gulp.task('default', gulp.series('serve'));
