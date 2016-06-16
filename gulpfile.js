var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');

var config = {
  bowerDir: './bower_components',
  buildDir: './build',
};

gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.buildDir + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.buildDir + '/js'));
});

gulp.task('css', function() {
  return gulp.src('css/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.buildDir + '/css'));
});


// Watch .scss files
gulp.task('watch', function() {

  gulp.watch('css/**/*.scss', ['css']);

});

gulp.task('default', ['css', 'js', 'fonts']);
