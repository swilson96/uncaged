var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    del = require('del'),
    typescript = require('typescript'),
    runSequence = require('run-sequence'),
    gls = require('gulp-live-server'),
    exec = require('child_process').exec,
    Config = require('./gulpfile.config'),

    config = new Config(),
    server;


gulp.task('clean', function () {
    return del(config.webappSrc + '/node_modules');
});


gulp.task('ts-lint', function () {
    return gulp.src(config.typescript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

var tsProject = tsc.createProject(config.webappSrc + '/tsconfig.json');
gulp.task('compile-ts', function () {
    var tsResult = tsProject.src()
        .pipe(tsc(tsProject));

    tsResult.dts
        .pipe(gulp.dest(config.webappSrc));

    return tsResult.js.pipe(gulp.dest(config.webappSrc + '/app'));
});


gulp.task('copy-webapp-nodemodules', function () {
    return gulp.src(config.webappRequiredModules, { base: '.'})
        .pipe(gulp.dest(config.webappSrc));
});

gulp.task('deploy-tsc', function (callback) {
    runSequence(
        'ts-lint',
        'compile-ts',
        callback
    )
});

gulp.task('build-webapp', function (callback) {
    runSequence(
        ['deploy-tsc', 'copy-webapp-nodemodules'],
        callback
    )
});


gulp.task('watch', function(callback) {
    gulp.watch(config.typescript, ['deploy-tsc']);
    callback();
});


var runCommand = function(command, callback) {
    var execCallback = function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (err !== null) {
            console.log('exec error: ' + err);
        }
        callback();
    };
    exec(command, execCallback);
};

gulp.task('start-db', function(callback) {
    runCommand('mongod --dbpath ./data --rest');
    callback();
});

gulp.task('stop-db', function(callback) {
    runCommand('mongo admin --eval "db.shutdownServer();"', callback);
});


gulp.task('run', function (callback) {
    server = gls(config.serverSrc + config.serverStartScript);
    server.start();

    callback();
});



gulp.task('default', function (callback) {
    runSequence(
        ['build-webapp', 'stop-db'],
        'watch',
        'start-db',
        'run',
        callback
    )
});

gulp.task('deploy', function (callback) {
    runSequence(
        'clean',
        'build-webapp',
        'run',
        callback
    )
});