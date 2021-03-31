const gulp = require('gulp');
const pug2html = require('./gulp/tasks/pug2html');
const style = require('./gulp/tasks/style');
const script = require('./gulp/tasks/script');
const svgSprite = require('./gulp/tasks/svgSprite');
const clean = require('./gulp/tasks/clean');
const browserSync = require('./gulp/tasks/browserSync');

module.exports.start = gulp.parallel(browserSync);
module.exports.build = gulp.series(clean, pug2html, style, script, svgSprite);
