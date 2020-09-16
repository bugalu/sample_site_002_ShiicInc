const { src, dest, watch, series, parallel } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();

//ベンダープレフィックス
const autoprefixer = require('autoprefixer');

//動作確認用サーバー
const browserSync = require('browser-sync');
const server = browserSync.create();

function compile() {
  return src(['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'])
    .pipe($.ejs({}, {}, { ext: ".html" }))
    .pipe($.rename({ extname: ".html" }))
    .pipe(dest('./dist'));
}

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.csscomb('zen.json'))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/css'));
}

function scripts() {
  return src('./src/ts/*.ts')
    .pipe($.sourcemaps.init())
    .pipe($.typescript({
      module: 'commonjs',
      strict: true
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/js'));
}

function startAppServer() {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('./src/**/*.ejs', compile);
  watch('./src/**/*.ejs').on('change', server.reload);
  watch('./src/**/*.scss', styles);
  watch('./src/**/*.scss').on('change', server.reload);
  // watch('./src/**/*.ts', lint);
  watch('./src/**/*.ts', scripts);
  watch('./src/**/*.ts').on('change', server.reload);
}


// const serve = series(parallel(compile, styles, series(lint, scripts)), startAppServer);
const serve = series(parallel(compile, styles, scripts), startAppServer);
exports.compile = compile;
exports.styles = styles;
exports.scripts = scripts;
exports.serve = serve;