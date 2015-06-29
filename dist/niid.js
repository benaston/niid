;(function(root) {

	'use strict';

	var namespace = {};

	;(function(namespace) {

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
		var names, iterator, reduceFn;

		if(!args) {
			return;
		}

		args = Array.prototype.slice.call(args);
		iterator = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : args;
		reduceFn = iterator === args ? undefinedCheck : unneededCheck.bind(null, args);

		iterator.reduce(reduceFn, null);
	}

	function unneededCheck(args, p, c, i) {
		if(c === '_') { return; }

		if(args[i] === undefined) {
			throw c + ' not defined.';
		}
	}

	function undefinedCheck(p, c, i) {
		if(c === undefined) {
			throw 'argument not defined.';
		}
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