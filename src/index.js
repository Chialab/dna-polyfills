(function() {
    // Load.
    var file = 'index.js';

    var modules = [
        '../node_modules/webcomponents.js/webcomponents-light.js',
        'array/foreach.js',
        'array/from.js',
        'array/is-array.js',
        'dom/class-list.js',
        'utils/promise.js',
    ];

    var src = document.querySelector('script[src*="' + file + '"]').getAttribute('src');
    var basePath = src.slice(0, src.indexOf(file));

    modules.forEach(function(f) {
      document.write('<script src="' + basePath + f + '"></script>');
    });
})();
