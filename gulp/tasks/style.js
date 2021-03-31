const { src, dest } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

module.exports = function styles() {
  return src('src/scss/**/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(dest('build/css'));
};
