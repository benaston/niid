# niid

Terse argument checking.

A function that when supplied with arguments and argument names will throw an exception when they are not present.

Also provides `needBeAlike` which will ensure an argument is 'like' an example.

File size: **1089 bytes**.<br/>
Supported platforms: **server and browser**.<br/>
Supported language versions: **ES5 and above**.

Supports gaps in argument lists. Also works with objects and their properties.

If you use this library in your software please tweet me @benastontweet.

## Installation

```npm install niid```

## Example 1

```javascript
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments, 'foo', 'bar');
	return 'OK';
}

myFunction(null, null); // 'OK'
myFunction(null, null, null); // 'OK'
myFunction(undefined, null, null); // throws 'foo is not defined.'
myFunction(null, undefined, null); // throws 'bar is not defined.'
```

## Example 2

```javascript
var needBeAlike = require('niid').needBeAlike;

var example = { foo: '', bar: { bam: 0 } };

function myFunction(options) {
	needBeAlike(options, example);
	return 'OK';
}

myFunction({}); // throws 'object unlike example.'
myFunction({ foo: null }); // throws 'object unlike example.'
myFunction({ foo: 1 }); // throws 'object unlike example.'
myFunction({ foo: 'foo' }); // throws 'object unlike example.'
myFunction({ foo: 'foo', bar: { bam: 42 } }); // OK
```

## Example 3 (argument gaps)

```javascript
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments, 'foo', '_', 'bam');
	return 'OK';
}

myFunction(null, undefined, null); // 'OK'
myFunction(null, undefined, undefined); // throws 'bam is not defined.'
```

## Example 4 (trailing argument gaps)

```javascript
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments, 'foo');
	return 'OK';
}

myFunction(null); // 'OK'
myFunction(null, undefined, undefined); // 'OK'
```

## Example 5 (short-hand for "all arguments required")

```javascript
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments);
	return 'OK';
}

myFunction(undefined, undefined, undefined); // throws 'argument is not defined.'
myFunction(null, undefined, undefined); // throws 'argument is not defined.'
myFunction(undefined, null, undefined); // throws 'argument is not defined.'
myFunction(undefined, undefined, null); // throws 'argument is not defined.'
myFunction(undefined, null, null); // throws 'argument is not defined.'
myFunction(null, null, null); // 'OK'
```

## Example 6 (object properties)

```javascript
var need = require('niid').need;

function myFunction(options) {
	need(options, 'foo');
	return 'OK';
}

myFunction({foo: undefined}); // throws 'foo is not defined.'
myFunction({foo: 'foo'}); // 'OK'
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.