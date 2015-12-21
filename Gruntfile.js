module.exports = function(grunt) {

  var cleanCssOptions = {
    advanced: true
  }
  
  /* Compilar archivos jade */
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.config('jade', {
    compile: {
      options: {
        data: {}
      },
      files: [{
        expand: true,
        cwd: 'src',
        src: [ '*.jade' ],
        dest: 'dist',
        ext: '.html'
      }]
    }
  });
  
  /* Compilar coffescript */
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.config('coffee', {
    build: {
      options: {
        bare: false
      },
      files: {
        'temp/app.js': ['src/scripts/app.coffee']
      }
    }
  });

  /* Concatenar archivos de script */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    scripts: {
      src: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'temp/app.js'
      ],
      dest: 'temp/scripts.js'
    }
  });
  
  /* Compactar y minimizar el archivo final de scripts */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'dist/assets/scripts.js' : 'temp/scripts.js'
      }
    }
  });
  
  /* Compilar archivos de estilo */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.config('less', {
    prod: {
      options: {
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
          new (require('less-plugin-clean-css'))(cleanCssOptions)
        ]
      },
      files: {
        "temp/styles.css": "src/styles/styles.less"
      }
    }
  });
  
  /* Minimizar y compactar archivo final de estilos */
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    app: {
      files: {
        'dist/assets/styles.css': ['temp/styles.css']
      }
    }
  });
  
  /* Copiando archivos */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    vendor: {
      files: [
        {
          expand: true,
          flatten: true,
          src: 'bower_components/bootstrap/fonts/*',
          dest: 'dist/fonts/'
        },
        {
          expand: true,
          flatten: true,
          src: 'bower_components/fontawesome/fonts/*',
          dest: 'dist/fonts/'
        }
      ]
    },
    dev: {
      files: [
        {
          src: 'bower_components/holderjs/holder.min.js',
          dest: 'dist/assets/holder.min.js'
        }
      ]
    },
    src: {
      cwd: 'src',
      src: [ 'images/**' ],
      dest: 'dist',
      expand: true
    }
  });
  
  /* Limpiando un poco */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    build: {
      src: [ 'dist' ]
    },
    temp: {
      src: [ 'temp' ]
    }
  });
  
  /* Tareas agrupadas */
  
  grunt.registerTask(
    'default', 
    'Compilación por defecto para desarrollo continuo', 
    ['clean:build', 'jade', 'scripts', 'styles', 'copy', 'clean:temp']
  );
  
  grunt.registerTask(
    'build', 
    'Compilación por defecto para distribución', 
    ['clean:build', 'jade', 'scripts', 'styles', 'copy', 'clean:temp']
  );
  
  grunt.registerTask(
    'scripts', 
    'Compila, concatena y compacta los scripts', 
    ['coffee', 'concat:scripts', 'uglify']
  );
  
  grunt.registerTask(
    'styles',
    'Compila y compacta los archivos de definición de estilos',
    ['less', 'cssmin']
  );
}