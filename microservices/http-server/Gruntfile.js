exports = module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      all: {
        src: ['**/*.spec.js', '!node_modules/**/*', '!common-ui/bower_components/**/*', '!microservices/**/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test',['mochaTest']);
}
