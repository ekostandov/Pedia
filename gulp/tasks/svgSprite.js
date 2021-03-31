const { src, dest } = require('gulp');
const svgSprite = require('gulp-svg-sprite');

module.exports = function svgToSprite() {
  return src('src/images/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('build/images/'));
};
