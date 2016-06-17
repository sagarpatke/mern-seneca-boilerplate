exports = module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      all: {
        src: ['**/*.spec.js', '!node_modules/**/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test',['mochaTest']);
}
