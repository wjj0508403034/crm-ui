/*
* See http://www.gruntjs.net
*/

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'uglify']
    },
    concat: {
      options: {
        // 定义一个用于插入合并输出文件之间的字符
        separator: ';'
      },
      dist: {
        // 将要被合并的文件
        src: ['src/**/*.js'],
        // 合并后的JS文件的存放位置
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // 此处定义的banner注释将插入到输出文件的顶部
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 只需在命令行上输入"grunt"，就会执行default task
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', ['jshint', 'concat', 'uglify'], function () {
    grunt.log.write('Start to build ...').ok();
    grunt.log.write('End to build.').ok();
  });

  grunt.registerTask('deploy', ['build'], function () {
    grunt.log.write('Start to deploy ...').ok();
  });
};