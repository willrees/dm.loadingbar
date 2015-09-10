module.exports = function (grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       
        concat: {
            dist: {
                src: [                    
                    'scripts/src/dm.loadingBar.js',                    
                ],
                dest: 'scripts/dist/dm.loadingBar.js',
            }
        },
        uglify: {
            dist: {
                files: {
                    'scripts/dist/dm.loadingBar.min.js': 'scripts/dist/dm.loadingBar.js'
                }
            }
        },  
        less: {
            development: {
                files: {
                     "styles/css/dm.loadingBar.css": "styles/less/dm.loadingBar.less"
                }
            }
        },                
        watch: {
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: ['styles/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');        
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less','concat', 'uglify']);
};
