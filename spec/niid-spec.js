'use strict';

var need = self.niid.need;
var needBeAlike = self.niid.needBeAlike;

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
            foo({
                foo: undefined,
                bar: 'bar'
            });
        }).toThrow('foo not defined.');
    });

    it('should not throw an exception if no arguments are supplied, and all properties are defined', function() {
        //arrange
        function foo(options) {
            need(options);
        }

        //act & assert
        expect(foo({
            foo: 'foo',
            bar: 'bar'
        })).toBe(undefined);
    })

    it('should not throw an exception if the specified properties are defined', function() {
        //arrange
        function foo(options) {
            need(options, 'foo');
        }

        //act & assert
        expect(foo({
            foo: 'foo',
            bar: undefined
        })).toBe(undefined);
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

    });

});

describe('needBeAlike', function() {

    [null, undefined, '', {}, function() {}, true].forEach(function(testCase) {
        it('should throw an exception if the object is unlike the example (number/' + testCase + ')', function() {
            //arrange
            var example = {
                foo: 1
            };

            //act & assert
            expect(needBeAlike.bind(null, testCase, example)).toThrow('object unlike example.');
        });
    });

    [null, undefined, '', 1, function() {}, true].forEach(function(testCase) {
        it('should throw an exception if the object is unlike the example (object/' + testCase + ')', function() {
            //arrange
            var example = {
                foo: {}
            };

            //act & assert
            expect(needBeAlike.bind(null, testCase, example)).toThrow('object unlike example.');
        });
    });

    [null, undefined, '', 1, {}, true].forEach(function(testCase) {
        it('should throw an exception if the object is unlike the example (function/' + testCase + ')', function() {
            //arrange
            var example = {
                foo: function() {}
            };

            //act & assert
            expect(needBeAlike.bind(null, testCase, example)).toThrow('object unlike example.');
        });
    });

    [null, undefined, 1, {}, function() {}, true].forEach(function(testCase) {
        it('should throw an exception if the object is unlike the example (string/' + testCase + ')', function() {
            //arrange
            var example = {
                foo: 'foo'
            };

            //act & assert
            expect(needBeAlike.bind(null, testCase, example)).toThrow('object unlike example.');
        });
    });

    [undefined, '', 1, {}, function() {}, true].forEach(function(testCase) {
        it('should throw an exception if the object is unlike the example (null/' + testCase + ')', function() {
            //arrange
            var example = {
                foo: null
            };

            //act & assert
            expect(needBeAlike.bind(null, testCase, example)).toThrow('object unlike example.');
        });
    });

    ['', 'foo', '1'].forEach(function(testCase) {
        it('should not throw an exception if the object is like the example (string: ' + testCase + ')', function() {
            //arrange
            var example = {
                foo: 'string'
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [null, undefined].forEach(function(testCase) {
        it('should not throw an exception if the object is like the example (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [
        [{}, {}],
        [/foo/g, /bar/g],
        [
            [],
            []
        ]
    ].forEach(function(testCase) {
        it('should not throw an exception if the object is like the example (string: ' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase[0]
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase[1]
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [true, false].forEach(function(testCase) {
        it('should not throw an exception if the object is like the example (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: testCase
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [{}].forEach(function(testCase) {
        it('should not throw an exception if the object differs recursively and the recurse option is false (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: {
                	bar: 1
                }
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example, {recurse: false})).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [{}, { bam: 1 }].forEach(function(testCase) {
        it('should throw an exception if the object differs recursively (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: {
                	bar: 1
                }
            };

            //act & assert
            expect(needBeAlike.bind(null, {
                foo: testCase
            }, example)).toThrow('object unlike example.');
        });
    });

    [{ bar: 2 }].forEach(function(testCase) {
        it('should not throw an exception if the object does not differ recursively (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: {
                	bar: 1
                }
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

    [{ bar: { bam: 'bam1', bat: null }, baz: 42 }].forEach(function(testCase) {
        it('should not throw an exception if the object does not differ recursively (' + testCase + ')', function() {
            //arrange
            var example = {
                foo: {
                	bar: {
                		bam: 'bam2'
                	},
                    baz: 1
                },
            };

            //act & assert
            expect(needBeAlike({
                foo: testCase
            }, example)).toBe(undefined); // i.e. exception not thrown.
        });
    });

});