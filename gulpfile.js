var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// LESS PLUGINS
var less = require('gulp-less');
var LessAutoPrefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoPrefix({
    browsers: ['last 2 versions']
});

// File Path
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var LESS_PATH = 'public/less/**/*.less';


// Styles
// gulp.task('styles', function () {
//     console.log('starting styles task');
//     return gulp.src(['public/css/reset.css', CSS_PATH])
//         .pipe(plumber(function (err) {
//             console.log('Styles Task Error'); 
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(concat('styles.css'))
//         .pipe(minifyCss())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH+'/css'))
//         .pipe(livereload());
// });

// Styles for SCSS
// gulp.task('styles', function () {
//     console.log('starting styles task');
//     return gulp.src(SCSS_PATH)
//         .pipe(plumber(function (err) {
//             console.log('Styles Task Error'); 
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH+'/css'))
//         .pipe(livereload());
// });

// Styles for LESS
gulp.task('styles', function () {
    console.log('starting styles task');
    return gulp.src('public/less/styles.less')
        .pipe(plumber(function (err) {
            console.log('Styles Task Error'); 
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [lessAutoprefix]
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH+'/css'))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Images
gulp.task('images', function() {
    console.log('starting images task');
});

gulp.task('default', function() {
    console.log('starting default');
});

gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts'])
    // gulp.watch(CSS_PATH, ['styles'])
    // gulp.watch(SCSS_PATH, ['styles'])
    gulp.watch(LESS_PATH, ['styles'])
});