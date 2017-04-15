var gulp = require('gulp');
var del = require('del');
var showFile = require('gulp-show-me-file');
var wiredep = require('wiredep').stream;
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var es = require('event-stream');
var inject = require('gulp-inject');
var bom = require('gulp-bom');

const DestFolder = "dist";


gulp.task('clean', function () {
  return del([DestFolder]);
});


gulp.task('default', ['build']);

gulp.task('build-css', ['clean'], function () {
  return gulp.src('src/main/**/*.css')
    .pipe(showFile())
    .pipe(concat("app.css"))
    .pipe(gulp.dest(DestFolder));
});

gulp.task('build-widget-css', ['clean'], function () {
  return gulp.src('src/common/**/*.css')
    .pipe(showFile())
    .pipe(concat("huoyun.widget.css"))
    .pipe(gulp.dest(DestFolder));
});

gulp.task('build-js', ['clean'], function () {
  return gulp.src(['src/main/index.js','src/main/huoyun.router.js','src/main/**/*.js'])
    .pipe(showFile())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(DestFolder));
});

gulp.task('copy-resource', ['clean'], function () {
  return gulp.src(['res/**',
    'libs/**/*.jpg',
    'libs/**/*.png'
  ])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/res`));
});

gulp.task('copy-font', ['clean'], function () {
  return gulp.src(['fonts/**'])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/fonts`));
});

gulp.task('copy-thirdparty', ['clean'], function () {
  return gulp.src('libs/**')
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('widget-template', ['clean'], function () {
  var templateStream = gulp.src('src/common/**/*.html')
    .pipe(showFile())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('huoyun.widget.tpl.js', {
      module: 'huoyun.widget'
    }));

  var es = require('event-stream');
  return es.merge([
    templateStream,
    gulp.src('src/common/**/*.js')
  ])
    .pipe(showFile())
    .pipe(concat('huoyun.widget.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('build', ['copy-thirdparty', 'build-widget-css', 'widget-template', 'copy-resource', 'copy-font', 'build-css', 'build-js'], function () {
  var injectCss = gulp.src([
    `${DestFolder}/**/*.css`
  ], {
      read: false
    });

  var injectJs = gulp.src([
    `${DestFolder}/libs/jquery.min.js`, // 必须把jquery放在第一个文件，后面很多模块依赖jquery
    `${DestFolder}/libs/angular.js`,
    `${DestFolder}/**/*.js`
  ], {
      read: false
    });

  return gulp.src('src/main/**/*.html')
    .pipe(showFile())
    .pipe(inject(injectCss, {
      transform: function (filepath) {
        return `<link rel="stylesheet" href="..${filepath}">`;
      }
    }))
    .pipe(inject(injectJs, {
      transform: function (filepath) {
        return `<script src="..${filepath}"></script>`;
      }
    }))
    .pipe(bom())
    .pipe(gulp.dest(`${DestFolder}`));
});

