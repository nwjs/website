const { exec } = require('node:child_process');
const { createServer } = require('node:https');
const { join } = require('node:path');

const { parallel, series, task, watch } = require('gulp');
const st = require('st');

task('build', function(cb) {
    exec(__dirname + '/node_modules/.bin/metalsmith');
    cb();
});

task('watch', function() {
    watch(['metalsmith.json', 'src/**/*', 'public/**/*', 'templates/**/*'], parallel('build'));
});

task('serve', series('build', task('watch'), async function() {
    createServer(await st({
        path: join(__dirname, 'build'),
        index: 'index.html',
        cache: false
    })).listen(3000);
}));

task('default', series('serve'));
