var grunt = require('grunt'),
    path =

require('load-grunt-tasks')(grunt);

var map = require('./src/build.json').map(function (path) {
    return 'src/' + path;
})

grunt.initConfig({
    clean: {
        dist: ['dist/**/*']
    },
    concat: {
        dist: {
            options: {
                sourceMap: true
            },
            files: {
                'dist/dna-polyfills.js': map
            }
        }
    },
    uglify: {
        dist: {
            options: {
                sourceMap: false
            },
            files: {
                'dist/dna-polyfills.min.js': 'dist/dna-polyfills.js'
            }
        }
    }
});

grunt.registerTask('build', ['clean', 'concat', 'uglify']);
