const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const webpack       = require('gulp-webpack');

const webpackConfig = require('./webpack.config.js');

gulp.task('webpack', () => {
    return gulp.src([
        'src/**/**.ts',
    ])
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('webpack_watch', () => {
    let config = webpackConfig;
    config.watch = true;
    config.cache = true;

    return gulp.src([
        'src/**',
    ])
        .pipe(plumber())
        .pipe(webpack(config))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', () => {
    gulp.start([
        'webpack_watch',
    ]);
});