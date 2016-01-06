var gulp = require('gulp');

var sass = require('gulp-sass'); //convert sass into css
var sourcemaps = require('gulp-sourcemaps'); //mappes sass to css for debug
var plumber = require('gulp-plumber'); //watches for errors in plugines 
var notify = require('gulp-notify'); //handle pop-up windows when error ocures
var browserSync = require('browser-sync'); //reloads browser when file changes
var useref = require('gulp-useref'); //concatenates files (js, html, css...)
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');


var sassOptions = {
					includePaths: ['dev/scss/'] /*tells gulp-sass where to look for @include files*/
					
					}; 

//to prevent watch function from crash when error ocures we use plumber plugin with this function					
function customPlumber (errTitle) {
	return plumber({
	errorHandler:  notify.onError({
		// Customizing error title
		title: errTitle || "Error running Gulp",
		message: "Error: <%= error.message %>"
		})
	});
}

gulp.task('browserSync', function() {
	browserSync({
		proxy: "localhost/hudognik",
		tunnel: 'hudognik'		
	})
});


gulp.task('sass', function(){
	return gulp.src('dev/scss/**/*.scss')
	.pipe(customPlumber ('Error Running Sass')) //watches for errors, logs them to console & ends watch task safely
	.pipe(sourcemaps.init())  // Process the original sources
	.pipe(sass(sassOptions)) // Compiles Sass to CSS with gulp-sass
	.pipe(autoprefixer({browsers: ['> 1%']}))
	.pipe(sourcemaps.write()) // Add the map to modified source.
	.pipe(gulp.dest('dev/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});



gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('./**/*.html', browserSync.reload);
	gulp.watch('./**/*.php', browserSync.reload); 
	gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('useref', function(){
  return gulp.src('./*.php')
    .pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
