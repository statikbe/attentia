var gulp = require('gulp')

var jshint = require('gulp-jshint')
var jshint_stylish = require('jshint-stylish')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var minify = require('gulp-minify-css')

var rename = require('gulp-rename')

gulp.task('jshint', function() {
  gulp.src('./src/js/index.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish))
});

gulp.task('js', ['jshint'], function() {
  gulp.src(['pikaday.js', 'lodash.custom.js', 'index.js'], {cwd: './src/js'})
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('css', function() {
  gulp.src('./src/sass/main.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['css'])
  gulp.watch('./src/js/**/*.js', ['js'])
})

gulp.task('default', ['js', 'css', 'watch'])