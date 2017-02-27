/*
* See http://www.gruntjs.net
*/

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['deploy']
    },
    concat: {
      options: {
        // 定义一个用于插入合并输出文件之间的字符
        separator: ';'
      },
      dest: {
        // 将要被合并的文件
        src: ['src/**/*.js'],
        // 合并后的JS文件的存放位置
        dest: 'dest/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // 此处定义的banner注释将插入到输出文件的顶部
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dest: {
        files: {
          'dest/<%= pkg.name %>.min.js': ['<%= concat.dest.dest %>']
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
    },
    /*
    * https://github.com/gruntjs/grunt-contrib-copy
    */
    copy: {
      build: {
        expand: true,
        cwd: 'src',
        src: ['**.html'],
        dest: "dest"
      },
      deploy: {
        expand: true,
        cwd: 'dest',
        src: ['**'],
        dest: "C:/inetpub/wwwroot/crm/"
      }
    },
    /*
    * https://github.com/gruntjs/grunt-contrib-clean
    */
    clean: {
      build: ["dest/*"],
      deploy: {
        src: ["C:/inetpub/wwwroot/crm/*"],
        options: {
          force: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // 只需在命令行上输入"grunt"，就会执行default task
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', "Build the source code", function () {
    grunt.task.run(['jshint', 'concat', 'uglify','copy']);
  });

  grunt.registerTask('deploy', "Deploy the dest to the web container", function () {
    grunt.task.run(['clean', 'build', 'copy']);
  });
};