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
const babel = require('gulp-babel');

const DestFolder = "dist";
const DeployDestFolder = "./../crm/crm/src/main/resources/templates/";
const DeployResourcesFolder = "./../crm/crm/src/main/resources/static/";
const Timestamp = Date.now();


gulp.task('clean', function() {
  return del([DestFolder]);
});

gulp.task('clean-deploy', function() {
  return del([`${DeployDestFolder}index.html`, DeployResourcesFolder], {
    force: true
  }).then(function(paths) {
    paths.forEach(function(path) {
      console.log(`>> [Delete File] ${path}`);
    });
  });
});


gulp.task('default', ['build']);

gulp.task('deploy-copy-resource', ['build'], function() {
  return gulp.src(`${DestFolder}/**/*`)
    .pipe(showFile())
    .pipe(gulp.dest(DeployResourcesFolder))
    .pipe(showFile());
});

gulp.task('deploy', ['clean-deploy', 'deploy-copy-resource']);

gulp.task('build-css', ['clean'], function() {
  return gulp.src('src/**/*.css')
    .pipe(showFile())
    .pipe(concat("app.css"))
    .pipe(gulp.dest(DestFolder));
});

// gulp.task('build-widget-css', ['clean'], function() {
//   return gulp.src('src/common/**/*.css')
//     .pipe(showFile())
//     .pipe(concat("huoyun.widget.css"))
//     .pipe(gulp.dest(DestFolder));
// });

gulp.task('copy-resource', ['clean'], function() {
  return gulp.src(['res/**',
      'libs/**/*.jpg',
      'libs/**/*.png'
    ])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/res`));
});

gulp.task('copy-font', ['clean'], function() {
  return gulp.src(['fonts/**'])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/fonts`));
});

gulp.task('copy-thirdparty', ['clean'], function() {
  return gulp.src('libs/**')
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('view-template', ['clean'], function() {
  var templateStream = gulp.src('src/view/**/*.html')
    .pipe(showFile())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('view.template.tpl.js', {
      module: 'huoyun'
    }));

  var es = require('event-stream');
  return es.merge([
      gulp.src(['src/index.js', 'src/**/*.js']),
      templateStream
    ])
    .pipe(showFile())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(DestFolder));
});

gulp.task('build', ['copy-thirdparty', 'copy-resource', 'copy-font', 'build-css',
  'view-template'
], function() {
  var injectCss = gulp.src([
    `${DestFolder}/libs/**/*.css`,
    `${DestFolder}/app.css`
  ], {
    read: false
  });

  var injectJs = gulp.src([
    `${DestFolder}/libs/jquery.min.js`, // 必须把jquery放在第一个文件，后面很多模块依赖jquery
    `${DestFolder}/libs/jquery-ui.min.js`,
    `${DestFolder}/libs/angular.js`,
    `${DestFolder}/libs/**/*.js`,
    `${DestFolder}/app.js`,
  ], {
    read: false
  });

  return gulp.src('src/index.html')
    .pipe(showFile())
    .pipe(inject(injectCss, {
      transform: function(filepath) {
        filepath = filepath.replace("/dist", "");
        filepath = `${filepath}?v=${Timestamp}`;
        return `<link rel="stylesheet" href="..${filepath}"></link>`;
      }
    }))
    .pipe(inject(injectJs, {
      transform: function(filepath) {
        filepath = filepath.replace("/dist", "");
        filepath = `${filepath}?v=${Timestamp}`;
        return `<script src="..${filepath}"></script>`;
      }
    }))
    .pipe(bom())
    .pipe(gulp.dest(`${DeployDestFolder}`))
    .pipe(showFile());
});