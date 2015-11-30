/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    //   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    //   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['lib/<%= pkg.name %>.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    browserify: {
      dist: {
        files: {
          'public/worker-delegator-test.js': 'src/worker-delegator-test.js',
          'public/dist.js': 'src/worker-delegator.js',
          'public/worker.js': 'src/worker.js'
        }
      }
      ,options: {
        transform: [["babelify", { "stage": 0 }]],
        watch: true,
        keepAlive: true
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        // src: '<%= concat.dist.dest %>',
        src: 'public/dist.js',
        dest: 'public/dist.min.js'
      }
    }
    // jshint: {
    //   options: {
    //     curly: true,
    //     eqeqeq: true,
    //     immed: true,
    //     latedef: true,
    //     newcap: true,
    //     noarg: true,
    //     sub: true,
    //     undef: true,
    //     unused: true,
    //     boss: true,
    //     eqnull: true,
    //     browser: true,
    //     globals: {}
    //   },
    //   gruntfile: {
    //     src: 'Gruntfile.js'
    //   },
    //   lib_test: {
    //     src: ['lib/**/*.js', 'test/**/*.js']
    //   }
    // },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    // watch: {
    //   gruntfile: {
    //     files: '<%= jshint.gruntfile.src %>',
    //     tasks: ['browserify','uglify']
    //   }
    //   ,lib_test: {
    //     files: '<%= jshint.lib_test.src %>',
    //     tasks: ['jshint:lib_test', 'qunit']
    //   }
    // }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-browserify');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  // grunt.registerTask('default', [
  //   'browserify',
  //   'jshint',
  //   'qunit',
  //   'concat',
  //   'uglify'
  //   ]);
  grunt.registerTask('default', ['browserify','uglify']);
};
 
