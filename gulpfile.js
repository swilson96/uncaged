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



gulp.task('ts-lint', function () {
    return gulp.src(config.typescript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

var tsCommonProject = tsc.createProject(config.commonSrc + '/tsconfig.json');
gulp.task('compile-ts-common', function () {
    var tsResult = tsCommonProject.src()
        .pipe(tsc(tsCommonProject));

    tsResult.dts
        .pipe(gulp.dest(config.commonSrc));

    return tsResult.js.pipe(gulp.dest(config.commonSrc));
});

gulp.task('copy-ts-common-to-web', function () {
    return gulp.src(config.commonSrc + '/*.js', { base: './common'})
        .pipe(gulp.dest(config.webappSrc + "/app"));
});

gulp.task('copy-ts-common-to-admin', function () {
    return gulp.src(config.commonSrc + '/*.js', { base: './common'})
        .pipe(gulp.dest(config.adminappSrc + "/app"));
});


var tsWebProject = tsc.createProject(config.webappSrc + '/tsconfig.json');
gulp.task('compile-ts-web', function () {
    var tsResult = tsWebProject.src()
        .pipe(tsc(tsWebProject));

    tsResult.dts
        .pipe(gulp.dest(config.webappSrc));

    return tsResult.js.pipe(gulp.dest(config.webappSrc + '/app'));
});

var tsAdminProject = tsc.createProject(config.adminappSrc + '/tsconfig.json');
gulp.task('compile-ts-admin', function () {
    var tsResult = tsAdminProject.src()
        .pipe(tsc(tsAdminProject));

    tsResult.dts
        .pipe(gulp.dest(config.adminappSrc));

    return tsResult.js.pipe(gulp.dest(config.adminappSrc + '/app'));
});


gulp.task('copy-webapp-nodemodules', function () {
    return gulp.src(config.webappRequiredModules, { base: '.'})
        .pipe(gulp.dest(config.webappSrc));
});

gulp.task('copy-admin-nodemodules', function () {
    return gulp.src(config.webappRequiredModules, { base: '.'})
        .pipe(gulp.dest(config.adminappSrc));
});

gulp.task('deploy-tsc', function (callback) {
    runSequence(
        'ts-lint',
        'compile-ts-common',
        ['copy-ts-common-to-web', 'copy-ts-common-to-admin'],
        ['compile-ts-web', 'compile-ts-admin'],
        callback
    )
});

gulp.task('build-webapps', function (callback) {
    runSequence(
        ['deploy-tsc', 'copy-webapp-nodemodules', 'copy-admin-nodemodules'],
        callback
    )
});


gulp.task('watch', function(callback) {
    gulp.watch(config.webappTypescript, ['compile-ts-web']);
    gulp.watch(config.adminTypescript, ['compile-ts-admin']);
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
        'build-webapps',
        'watch',
        'run',
        callback
    )
});

gulp.task('deploy', function (callback) {
    runSequence(
        'build-webapps',
        'run',
        callback
    )
});