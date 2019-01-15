module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            '<%= pkg.name %>': {
                src: ['src/js/**/*.js']
            }
        },
        concat: {
            dist: {
                src: ['src/js/**/*.js'],
                dest: 'dist/build.js'
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                src: 'dist/build.js',
                dest: 'dist/build.min.js'
            }
        },
        cssmin: {
            with_bunner: {
                options: {
                    banner: '/*  */'
                },
                files: {
                    'dist/style.min.css': ['src/css/style.css', 'src/css/modules/**/*.css']
                }
            }
        },
        removelogging: {
            build: {
                src: 'dist/build.min.js',
                dest: 'dist/build.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            css: {
                files: ['src/css/**/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'cssmin', 'removelogging']);
};