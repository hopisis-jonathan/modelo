var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var gutil = require('gulp-util' );
var ftp = require('vinyl-ftp');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

//Criamos outra tarefa com o nome 'dist'
gulp.task('generate-dist', function() {
    
      // Carregamos os arquivos novamente
      // E rodamos uma tarefa para concatenação
      // Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
      // E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build/
      gulp.src(['./js/app/**'])
      .pipe(concat('core.min.js'))
      .pipe(gulp.dest('./dist/js'));
  
      gulp.src(['./js/app.init.js','./js/app.routes.js'])
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task( 'ftp', function () {
 
  var conn = ftp.create( {
      host:     'server',
      user:     'login',
      password: 'senha',
      parallel: 10
  } );

  var globs = [
    'app/**',
    'css/**',
    'dist/**',
    //'lib/**',
    'views/**',
    'index.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
      .pipe( conn.newer( '/public_html/tecnofit' ) ) // only upload newer files
      .pipe( conn.dest( '/public_html/tecnofit' ) );

} );

gulp.task('deploy', function () {
  return runSequence(['generate-dist'], ['ftp']);
});
