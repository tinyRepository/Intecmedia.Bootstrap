module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var browsers = [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 8",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            intecmedia: {
                options: {
                    banner: '/*! Generated by Grunt-Contrib-LESS: <%= grunt.template.today("isoDateTime") %> | css/style.less */\r\n',
                    strictMath: true,
                    syncImport: true
                },
                files: {
                    'css/style.min.css': 'css/style.less'
                }
            }
        },
        cssnano: {
            options: {
                sourcemap: false,
                reduceIdents: false,
                autoprefixer: {browsers: browsers, add: true},
                discardComments: {removeAll: true}
            },
            intecmedia: {
                files: {
                    './css/style.min.css': './css/style.min.css'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './css/*.{less,css}', './css/**/*.{less,css}',
                        './js/*.js', './js/**/*.js',
                        './*.{php,html}', './**/*.{php,html}'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        watch: {
            files: ['css/*.less', 'css/**/*.less'],
            tasks: ['less', 'cssnano']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('sync', ['browserSync', 'watch']);
};
