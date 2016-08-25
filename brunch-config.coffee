exports.config =
    # See http://brunch.io/#documentation for docs.
    files:
        javascripts:
            joinTo:
                'js/app.js': /^app/
                'js/vendor.js': /^(bower_components|vendor)/
        stylesheets:
            joinTo:
                'css/vendor.css': /^(bower_components|vendor)/
                'css/app.css': /^app\/scss/

    conventions:
        assets: /(bootstrap\/dist\/fonts)|(assets)|(app\/views)|(app\/translations)/

    plugins:
        autoReload:
            enabled:
                js: on
                assets: on
        sass:
          options:
            includePaths: ['app/scss']