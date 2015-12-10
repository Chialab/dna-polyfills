// https://gist.github.com/edoardocavazza/47246856759f2273e48b
(function () {
    if (typeof Object.setPrototypeOf === 'undefined' && typeof Object.getOwnPropertyNames === 'function') {
        var _exclude = ['length', 'name', 'arguments', 'caller', 'prototype'];

        function bindFunction(ctx, fn) {
            return function() {
                fn.apply(ctx, arguments);
            }
        }

        function bindProperty(ctx, parent, prop) {
            Object.defineProperty(ctx, prop, {
                get: function () {
                    try {
                        return parent[prop];
                    } catch(ex) {}
                },
                set: function (val) {
                    try {
                        parent[prop] = val;
                    } catch(ex) {}
                },
                configurable: true
            });
        }

        function iterateProps(subClass, superClass) {
            var props = Object.getOwnPropertyNames(superClass),
                proto;

            subClass.__proto__ = superClass;
            for (var i = 0, len = props.length; i < len; i++) {
                var prop = props[i];
                if (prop === '__proto__') {
                    proto = superClass[prop];
                } else if (_exclude.indexOf(i) === -1) {
                    var descriptor = Object.getOwnPropertyDescriptor(subClass, prop);
                    if (!descriptor) {
                        var superDescriptor = Object.getOwnPropertyDescriptor(superClass, prop);
                        if (typeof superDescriptor.get !== 'function' && typeof superClass[prop] === 'function') {
                            subClass[prop] = bindFunction(subClass, superClass[prop]);
                        } else {
                            bindProperty(subClass, superClass, prop);
                        }
                    }
                }
            }
            if (proto) {
                iterateProps(subClass, proto);
            }
        }

        Object.setPrototypeOf = iterateProps;
    }
})();
