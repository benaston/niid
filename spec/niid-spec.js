'use strict';

var need = self.niid.need;

describe('need when supplied with a non-arguments object', function() {

	it('should *not* throw an exception the argument is null', function() {
		//arrange & act & assert
		expect(need(null)).toBe(null); // i.e. no exception thrown
	});

	it('should *not* throw an exception if the argument is undefined', function() {
		//arrange & act & assert
		expect(need(undefined)).toBe(undefined); // i.e. no exception thrown
	});

	it('should throw an exception if the argument is undefined', function() {
		//arrange
		function foo(options) {
			need(options, 'foo');
		}

		//act & assert
		expect(function() {
			foo({});
		}).toThrow('foo not defined.');
	});

	it('should throw an exception if no arguments are supplied, but a property is undefined because this is a shorthand syntax ', function() {
		//arrange
		function foo(options) {
			need(options);
		}

		//act & assert
		expect(function() {
			foo({ foo: undefined, bar: 'bar' });
		}).toThrow('foo not defined.');
	});

	it('should not throw an exception if no arguments are supplied, and all properties are defined', function() {
		//arrange
		function foo(options) {
			need(options);
		}

		//act & assert
		expect(foo({ foo: 'foo', bar: 'bar' })).toBe(undefined);
	})

	it('should not throw an exception if the specified properties are defined', function() {
		//arrange
		function foo(options) {
			need(options, 'foo');
		}

		//act & assert
		expect(foo({ foo: 'foo', bar: undefined })).toBe(undefined);
	});

});

describe('need', function() {

	describe('when needed arguments are supplied', function() {

		describe('when no named arguments are defined in the call to need', function() {

			describe('with one argument', function() {

				it('should throw an exception if the argument is undefined', function() {
					//arrange
					function foo(bar) {
						need(arguments);
					}

					//act & assert
					expect(function() {
						foo(undefined);
					}).toThrow('argument not defined.');
				});

				it('should *not* throw an exception the argument is supplied', function() {
					//arrange
					function foo(bar) {
						need(arguments);
					}

					//act & assert
					expect(foo(null)).toBe(undefined); // i.e. no exception thrown
				});

			});

			describe('with two arguments', function() {

				it('should throw an exception if the first argument is undefined', function() {
					//arrange
					function foo(bar, bam) {
						need(arguments);
					}

					//act & assert
					expect(function() {
						foo(undefined, null);
					}).toThrow('argument not defined.');
				});

				it('should throw an exception if the second argument is undefined', function() {
					//arrange
					function foo(bar, bam) {
						need(arguments);
					}

					//act & assert
					expect(function() {
						foo(null, undefined);
					}).toThrow('argument not defined.');
				});

				it('should throw an exception if both arguments are undefined', function() {
					//arrange
					function foo(bar, bam) {
						need(arguments);
					}

					//act & assert
					expect(function() {
						foo(undefined, undefined);
					}).toThrow('argument not defined.');
				});

				it('should *not* throw an exception if both arguments are supplied', function() {
					//arrange
					function foo(bar, bam) {
						need(arguments);
					}

					//act & assert
					expect(foo(null, null)).toBe(undefined); // i.e. no exception thrown
				});

			});

		});

		describe('when no unneeded arguments are defined', function() {

			it('should *not* throw an exception if there is a single argument', function() {
				//arrange
				function foo(bar) {
					need(arguments, 'bar');
				}

				//act & assert
				expect(foo(null)).toBe(undefined); // i.e. no exception thrown
			});

			it('should *not* throw an exception if there is a single argument and it is an underscore', function() {
				//arrange
				function foo(bar) {
					need(arguments, 'bar');
				}

				//act & assert
				expect(foo('_')).toBe(undefined); // i.e. no exception thrown
			});

			it('should *not* throw an exception if there are multiple arguments', function() {
				//arrange
				function foo(bar, bam) {
					need(arguments, 'bar', 'bam');
				}

				//act & assert
				expect(foo(null, null)).toBe(undefined); // i.e. no exception thrown
			});

		});

		describe('when unneeded arguments are defined', function() {

			it('should *not* throw an exception if there are multiple arguments', function() {
				//arrange
				function foo(bar, bam, baz) {
					need(arguments, 'bar', '_', 'baz');
				}

				//act & assert
				expect(foo(null, undefined, null)).toBe(undefined); // i.e. no exception thrown
			});

			it('should *not* throw an exception if there are undefined arguments unspecified at the end of the arguments list', function() {
				//arrange
				function foo(bar, bam, baz) {
					need(arguments, 'bar');
				}

				//act & assert
				expect(foo(null)).toBe(undefined); // i.e. no exception thrown
			});

		});

	});

	describe('when a needed argument is not supplied', function() {

		it('should throw an exception if there is a single argument', function() {
			//arrange
			function foo(bar) {
				need(arguments, 'bar');
			}

			//act & assert
			expect(function() {
				foo();
			}).toThrow('bar not defined.');
		});

		it('should throw an exception if there are multiple required arguments and the first is missing', function() {
			//arrange
			function foo(bar, bam) {
				need(arguments, 'bar', 'bam');
			}

			//act & assert
			expect(function() {
				foo(undefined, null);
			}).toThrow('bar not defined.');
		});

		it('should throw an exception if there are multiple required arguments and the second is missing', function() {
			//arrange
			function foo(bar, bam) {
				need(arguments, 'bar', 'bam');
			}

			//act & assert
			expect(function() {
				foo(null);
			}).toThrow('bam not defined.');
		});

		it('should throw an exception if there are multiple required arguments and the second is missing (and the third argument is supplied)', function() {
			//arrange
			function foo(bar, bam, baz) {
				need(arguments, 'bar', 'bam');
			}

			//act & assert
			expect(function() {
				foo(null, undefined, null);
			}).toThrow('bam not defined.');
		});

		it('should throw an exception if the required argument is not first', function() {
			//arrange
			function foo(bar, bam) {
				need(arguments, '_', 'bam');
			}

			//act & assert
			expect(function() {
				foo();
			}).toThrow('bam not defined.');
		});

	})

});