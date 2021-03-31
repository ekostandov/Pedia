const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const pug2html = require('./pug2html');
const style = require('./style');
const script = require('./script');
const svgSprite = require('./svgSprite');

module.exports = function serve(cb) {
  browserSync.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
  });

  gulp
    .watch('src/images/*.svg', gulp.series(svgSprite))
    .on('change', browserSync.reload);
  gulp.watch(
    'src/scss/**/*.scss',
    gulp.series(style, (cb) =>
      gulp.src('build/css').pipe(browserSync.stream()).on('end', cb)
    )
  );
  gulp
    .watch('src/js/**/*.js', gulp.series(script))
    .on('change', browserSync.reload);
  gulp.watch('src/pages/**/*.pug', gulp.series(pug2html));
  gulp.watch('build/*.html').on('change', browserSync.reload);

  return cb;
};
