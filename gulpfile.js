'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concatCss = require('gulp-concat-css');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');


function buildStyles() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
}


exports.default = buildStyles;

exports.watch = function () {
    gulp.watch('./src/scss/*.scss', gulp.series('default'));
};