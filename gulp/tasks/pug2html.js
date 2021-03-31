const { src, dest } = require('gulp');
const pug = require('gulp-pug');

module.exports = function pug2html() {
  return src('src/pages/*.pug').pipe(pug()).pipe(dest('build'));
};
