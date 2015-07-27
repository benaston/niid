;(function(root) {

	'use strict';

	var namespace = {};

	;
(function(namespace) {

    'use strict';

    var E = 'object unlike example.';

    function needBeAlike(o, example, options) {
        if (!isObject(o)) {
            throw E;
        }
        if (!isObject(example)) {
            throw E;
        }

        Object.keys(example)
            .forEach(iteratorFn.bind(null, o, example, options));
    }

    function iteratorFn(o, example, options, k) {
        if (!typesMatch(o[k], example[k])) {
            throw E;
        }

        if (isObject(example[k])) {
        	if(options && options.recurse === false) {
        		return;
        	}
            needBeAlike(o[k], example[k]);
        }
    }

    function isObject(o) {
        return o !== null && typeof o === 'object';
    }

    function typesMatch(a, b) {
        return typeof a === typeof b;
    }

    /**
     * See the readme.md for examples of use.
     * @param  {Object/Arguments} args  The object to check.
     * @return {undefined or null}
     */
    function need(args) {
        var argsArray, restArgs;

        if (!args) {
            return args;
        }

        argsArray = Array.prototype.slice.call(args);
        restArgs = Array.prototype.slice.call(arguments, 1);

        if (isArgumentObject(args)) {
            return argCheck(argsArray, restArgs);
        }

        return objectCheck(args, restArgs);
    }

    function argCheck(args, restArgs) {
        var iterator, reduceFn;

        iterator = restArgs.length ? restArgs : args;
        reduceFn = iterator === args ? undefinedCheck : unneededCheck.bind(null, args);

        iterator.reduce(reduceFn, null);
    }

    function objectCheck(o, restArgs) {
        var iterator, reduceFn;

        iterator = restArgs.length ? restArgs : Object.keys(o);
        reduceFn = undefinedCheckIn.bind(null, o);

        iterator.reduce(reduceFn, null);
    }

    function undefinedCheckIn(o, p, c) {
        if (o[c] === undefined) {
            throw c + ' not defined.';
        }
    }

    function unneededCheck(args, p, c, i) {
        if (c === '_') {
            return;
        }

        if (args[i] === undefined) {
            throw c + ' not defined.';
        }
    }

    function undefinedCheck(p, c, i) {
        if (c === undefined) {
            throw 'argument not defined.';
        }
    }

    function isArgumentObject(item) {
        return Object.prototype.toString.call(item) === '[object Arguments]';
    }

    namespace.need = need;
    namespace.needBeAlike = needBeAlike;

}(namespace));

	if ((typeof exports === 'object') && module) {
		module.exports = namespace; // CommonJS
	} else if ((typeof define === 'function') && define.amd) {
		define(function() {
			return namespace;
		}); // AMD
	} else {
		root.niid = namespace; // Browser
	}

}(this));