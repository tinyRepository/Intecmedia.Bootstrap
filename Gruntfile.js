module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-lesslint");
    grunt.loadNpmTasks("grunt-contrib-jshint");

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
        lesslint: {
            src: ["css/bootstrap.less", "css/style.less"]
        }
    });

    grunt.registerTask("test", ["jshint", "lesslint"]);
    grunt.registerTask("default", ["jshint", "lesslint"]);

};