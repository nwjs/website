'use strict';

var path = require('path');
var gulp = require('gulp');
var st = require('st');
var http = require('http');
var child_process = require('child_process');

gulp.task('build', async function (cb) {
    child_process.exec(__dirname + '/node_modules/.bin/metalsmith');
    cb();
});

gulp.task('watch', function () {
    gulp.watch(['metalsmith.json', 'src/**/*', 'public/**/*', 'templates/**/*'], gulp.parallel('build'));
});

gulp.task('serve', gulp.series('build', gulp.parallel('watch', function () {
    http.createServer(st({
        path: path.join(__dirname, 'build'),
        index: 'index.html',
        cache: false
    })).listen(3000);
})));

gulp.task('default', gulp.series('serve'));
