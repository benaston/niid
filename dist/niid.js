;(function(root) {

	'use strict';

	var namespace = {};

	;
(function(namespace) {

	'use strict';

	/**
	 * Expects an arguments object, followed by zero or more 
	 * string arguments, corresponding to argument names.
	 * If a single argument is supplied, then all arguments 
	 * are verified to be defined. If more than one argument 
	 * is supplied, then the arguments corresponding to indices 
	 * that do not contain an '_' (underscore) are checked to 
	 * be defined.
	 * @param  {Arguments} args  The arguments object to check.
	 * @return {undefined}
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