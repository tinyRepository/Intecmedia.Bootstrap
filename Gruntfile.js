module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-lesslint");

    grunt.initConfig({
        jshint: {
            files: ["Gruntfile.js", "js/application.js"],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        less: {
            production: {
                options: {
                    strictMath: true
                },
                files: {
                    "css/style.css": "css/style.less"
                }
            },
            development: {
                options: {
                    strictMath: true
                },
                files: {
                    "css/style.css": "css/style.less"
                }
            }
        },
        watch: {
            files: "css/*.less",
            tasks: ["less"]
        },
        lesslint: {
            src: ["css/bootstrap.less", "css/style.less"]
        }
    });

    grunt.registerTask("lint", ["jshint", "lesslint"]);
    grunt.registerTask("less", ["less"]);
    grunt.registerTask("watch", ["watch"]);
};