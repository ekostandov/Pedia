const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

module.exports = function script() {
  return src('src/js/app.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('build/js'));
};
