# niid

Terse argument checking.

A function that when supplied with arguments and argument names will throw an exception when they are not present.

File size: 487 bytes.<br/>
Supported platforms: server and browser.<br/>
Supported language versions: ES5 and above.

Supports gaps in argument lists.

## Example 1

```
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

## Example 2 (argument gaps)

```
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments, 'foo', '_', 'bam');
	return 'OK';
}

myFunction(null, undefined, null); // 'OK'
myFunction(null, undefined, undefined); // throws 'bam is not defined.'
```

## Example 3 (trailing argument gaps)

```
var need = require('niid').need;

function myFunction(foo, bar, bam) {
	need(arguments, 'foo');
	return 'OK';
}

myFunction(null); // 'OK'
myFunction(null, undefined, undefined); // 'OK'
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.