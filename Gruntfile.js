module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        less: {
            production: {
                options: {
                    strictMath: true
                },
                files: {
                    "css/style.min.css": "css/style.less"
                }
            },
            development: {
                options: {
                    strictMath: true
                },
                files: {
                    "css/style.min.css": "css/style.less"
                }
            }
        },
        watch: {
            files: "css/*.less",
            tasks: ["less"]
        }
    });

    grunt.registerTask("less", ["less"]);
    grunt.registerTask("watch", ["watch"]);
};