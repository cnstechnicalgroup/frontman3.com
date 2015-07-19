var assemble = require('assemble');
var less = require('gulp-less');
var extname = require("gulp-extname");

assemble.task('html', function() {
  assemble.src('templates/*.hbs')
    .pipe(extname())
    .pipe(assemble.dest('dist/'));
});

/*assemble.task('css', function () {
  assemble.src('styles/*.css')
    .pipe(less())
    .pipe(assemble.dest('dist/assets/css'));
});*/

assemble.task('assets', function () {
  assemble.src('assets/*')
    .pipe(assemble.dest('dist/assets/'));
});

assemble.task('default', ['html', 'css']);
