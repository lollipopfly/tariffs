var gulp         = require('gulp'),
	postcss      = require('gulp-postcss'),
	slim         = require("gulp-slim"),
	browserSync  = require('browser-sync').create(),
	sass         = require('gulp-sass'),
	size         = require('postcss-size'),
	autoprefixer = require('autoprefixer'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	pxtorem      = require('postcss-pxtorem'),
	plumber      = require('gulp-plumber'),
	notify       = require("gulp-notify");

/*------------------------------------*\
    Slim
\*------------------------------------*/

gulp.task('slim', function(){
  gulp.src("./src/slim/*.slim")
    .pipe(slim({
      pretty: false
    }))
    .pipe(gulp.dest(""));
});


/*------------------------------------*\
	Sass
\*------------------------------------*/

gulp.task('sass', function() {
  var processors = [
	autoprefixer({ browsers: ['last 20 versions'] }),
	 size,
	 pxtorem
  ];

  return gulp.src([
		  'src/sass/_main.scss',
		  'src/sass/style.scss',])
	.pipe(concat('style.css'))
	.pipe(sass().on('error', error))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(postcss(processors))
	.pipe(gulp.dest('dist/css/'));
});

/*------------------------------------*\
	Borwsersync server
\*------------------------------------*/

gulp.task('serve', ['sass'], function() {
	browserSync.init({
	server: ""
	});

	gulp.watch("dist/css/style.css").on('change', browserSync.reload);
	gulp.watch("index.html").on('change', browserSync.reload);
});

/*------------------------------------*\
	Watch
\*------------------------------------*/

gulp.task('watch', function() {
	gulp.watch('src/slim/**/*.slim', { interval: 500 }, ['slim', 'notify']);
	gulp.watch('src/sass/**/*.scss', { interval: 500 }, ['sass', 'notify']);
});

/*------------------------------------*\
	Notify
\*------------------------------------*/

gulp.task('notify', function(a) {
  var date = new Date();
  gulp.src("dist/css/style.css")
  .pipe(notify("Css was compiled! at " + date));
});

/*------------------------------------*\
	Run default gulp tasks
\*------------------------------------*/

gulp.task('default', ['slim', 'sass', 'watch']);


/**
***************************************************************
* =FUNCTIONS
***************************************************************
**/

// function like a plumber js
function error(error) {
  console.log(error.toString());
  this.emit('end');
}

