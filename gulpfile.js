'use strict';

// Include gulp
var gulp = require('gulp');
var webpack = require('webpack');

// Include Our Plugins

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var maps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

var paths = {
  scripts: ['public/javascripts/*.js*', 'routes/*.js', '!node_modules'],
  images: ['public/images/*.jp*', 'spublic/images/*.png', 'public/images/*.svg', 'public/images/*.gif'],
  sass: 'src/scss/**/*.scss',
};


// Lint Task
gulp.task('lint-all', function() {
  var task = paths.scripts.map(function(element) {
    return gulp.src(element)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  })
});

// Compile Our sass
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    // .pipe(gulp.dest('public/stylesheets'))
    .pipe(autoprefixer({
        browsers: ['> 5%'],
        cascade: false
    }))
    .pipe(gulp.dest('public/stylesheets'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  webpack(require('./webpack.config.js'), function(err, stats) {
    console.log(err)
  });
});

// gulp.task('images', ['favicon'], function () {
//   gulp.src(paths.images)
//     .pipe(imagemin())
//     .pipe(gulp.dest('public/images'))
// });


// gulp.task('favicon', function() {
//   gulp.src('src/images/favicon.ico')
//     .pipe(gulp.dest('public/images'))
// });

// Watch Files For Changes
gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.scripts, ['lint-all', 'scripts']);
  gulp.watch(paths.sass, ['sass']);
});

// Default task
gulp.task('default', ['lint-all', 'sass' , 'scripts']);
