var gulp        = require('gulp');
var browserSync = require('browser-sync');
var compass     = require('gulp-compass');
var cssmin      = require('gulp-cssmin');
var cp          = require('child_process');

var siteRoot = '_site';
var sassFiles = 'assets/sass/*.scss';

gulp.task('css', () => {
  gulp.src(sassFiles)
    .pipe(compass({
        config_file: './config.rb',
        css: 'assets/css',
        sass: 'assets/sass'
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('jekyll', () => {
    cp.spawn('jekyll' , ['build',
        '--watch',
        '--incremental'
    ]);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: '_site'
    }
  });

  gulp.watch(sassFiles, ['css']);
});

gulp.task('default', ['css', 'jekyll', 'serve'])