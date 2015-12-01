(function () {
    // https://gist.github.com/atk/1034882
    if (typeof Array.isArray === 'undefined') {
        // only set function if not already available
        Array.isArray = function(a) {
            return
            // is not the string '[object Array]' and
                '' + a !== a &&
                // test with Object.prototype.toString
                {}.toString.call(a) == '[object Array]'
        }
    }
})();
