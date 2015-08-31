var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');


gulp.task('media',['sass'], function () {
    gulp.src('css/*.css')
        .pipe(gcmq())
        .pipe(gulp.dest('css'));
});

gulp.task('sass', function () {
  gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);  // Watch all the .less files, then run the less task
});

gulp.task('prefixer',['media'], function () {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});



gulp.task('default', ['watch','media','webserver']);