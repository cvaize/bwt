let mix = require('laravel-mix');
mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
    'node_modules/alertifyjs/build/css/alertify.min.css',
    'node_modules/alertifyjs/build/css/themes/bootstrap.min.css',
    'node_modules/animate.css/animate.min.css',
    ], 'public/css/all.css')
    .scripts([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
        'node_modules/alertifyjs/build/alertify.min.js',

        'resources/assets/js/first/ajaxSetup.js',

        'resources/assets/js/default/datepicker.js',
    ], 'public/js/all.js')
    .js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/welcome.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sass('resources/assets/sass/welcome.scss', 'public/css');
