"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

const jshint = require("gulp-jshint");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
// const babel = require("gulp-babel");

const imagemin = require("gulp-imagemin");

//sass to css
gulp.task("sassworkflow", function() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/CSS"));
});

//test
gulp.task("message", function() {
  return console.log("working");
});

gulp.task("lint", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

//minify and concat js
gulp.task("scripts", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(rename("scripts.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./dist/js"));
});

//copy html files
gulp.task("copyHtml", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//minify images
gulp.task("imageMin", function() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("watch", function() {
  gulp.watch("./src/*.html", ["copyHtml"]);
  gulp.watch("./src/js/*.js", ["lint", "scripts"]);
  gulp.watch("./src/sass/**/*.scss", ["sassworkflow"]);
  gulp.watch("./src/images*", ["imageMin"]);
});
