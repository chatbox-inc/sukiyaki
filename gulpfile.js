var gulp = require("gulp");

var sass = require("gulp-sass");
var bulkSass = require("gulp-sass-bulk-import");
var pleeease = require("gulp-pleeease");
var sourcemaps = require('gulp-sourcemaps');

var watch = require("gulp-watch");
var rename  = require("gulp-rename");
var uglify  = require("gulp-uglify");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");

var webpack = require("webpack-stream");
var electron = require('electron-connect').server.create();

var dir = {
	"source"     : "src",
	"dest"       : "res",
	"bs_base"    : "./",
	"build_base" : "./"
};

gulp.task("js", function (){
	gulp.src("res/js/main.js")
		.pipe(plumber())
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest("./"));
		// .pipe(uglify())
		// .pipe(rename({
		// 	extname: ".min.js"
		// }))
		// .pipe(gulp.dest(dir.build_base + dir.dest + "/js"))
})

gulp.task("sass", function(){
	gulp.src(dir.build_base + dir.source + "/scss/style.scss")
		.pipe(plumber({
			errorHandler: notify.onError("<%= error.message %>")
		}))
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 2 versions']
			},
			minifier: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dir.build_base + dir.dest+"/css"));
		// .pipe(pleeease({
		// 	minifier: true
		// }))
		// .pipe(rename({
		// 	extname: '.min.css'
		// }))
		// .pipe(gulp.dest(dir.build_base + dir.dest+"/css"));
});

gulp.task("build", ["js", "sass"]);

gulp.task("default", ["js", "sass"], function (){
	electron.start();

	watch(
		[dir.build_base + dir.source + "/js/**"],
		function (){
			return gulp.start(['js']);
		}
	);

	watch(
		[dir.build_base + dir.source + "/scss/**"],
		function (){
			return gulp.start(['sass']);
		}
	);

	watch(
		[dir.build_base + dir.source + "/jade/**"],
		function (){
			return gulp.start(['jade']);
		}
	);

	watch(
		[
			"index.html",
			dir.build_base + dir.source + "/**/**.**"
		],
		electron.reload
	);

	gulp.watch(['main.js'], electron.restart);
});
