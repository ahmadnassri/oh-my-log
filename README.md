# oh-my-log [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> Beautiful console logs for your console applications with [native string substitution](https://nodejs.org/docs/latest/api/console.html#console_console_log_data) and [Chalk][chalk] support.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --save oh-my-log
```

## Usage

### myLog(name, [options])

- **name** (`String`, *Required*): The name/label to use
- **options** (`Object`, *Optional*): An optional [`options`](#options) object may be passed that alters certain behaviours

Returns: `Function` The logging function


```js
var myLog = require('oh-my-log')

var log = myLog('😄')

log('foo')
```

The above example will output:

![example](example.png)

### Options

| Name        | Type       | Required | Description                                                                         | Default          |
| ----------- | ---------- | -------- | ----------------------------------------------------------------------------------- | ---------------- |
| `prefix`    | `String`   | no       | prefix this string after substitution with `locals` values using [`fürmat`][furmat] | `[%name] %date:` |
| `locals`    | `Object`   | no       | `locals` object, *see [`fürmat`][furmat] for details*                               | `false`          |
| `modifiers` | `Object`   | no       | custom modifiers, *see [`fürmat`][furmat] for details*                              | `{}`             |
| `chalk`     | `Boolean`  | no       | enable/disable chalk modifiers support *see [`fürmat`][furmat] for details*         | `true`           |
| `date`      | `String`   | no       | any [`dateformat`](https://www.npmjs.com/package/dateformat) compatible value       | `hh:MM:ss TT`    |
| `func`      | `Function` | no       | The logging function                                                                | `console.log`    |

## [fürmat][furmat] & [Chalk](chalk)

`oh-my-log` relies heavily on `fürmat` for styling text *(using `chalk`)* and adding modifiers functions for extended formating, please review [`furmat`][furmat] and [`chalk`][chalk] documentation for more details on how to use those modules.


`oh-my-log` will also look for `options` object in your `package.json` file. *This is accomplished using [`pkg-config`](https://www.npmjs.com/package/pkg-config), refer to `pkg-config`'s [README](https://github.com/ahmadnassri/pkg-config/blob/master/README.md) for more info*.

## License

[ISC License](LICENSE) &copy; [Ahmad Nassri](https://www.ahmadnassri.com/)

[chalk]: https://github.com/chalk/chalk
[furmat]: https://github.com/ahmadnassri/furmat

[license-url]: https://github.com/ahmadnassri/oh-my-log/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/oh-my-log
[travis-image]: https://img.shields.io/travis/ahmadnassri/oh-my-log.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/oh-my-log
[npm-license]: https://img.shields.io/npm/l/oh-my-log.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/oh-my-log.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/oh-my-log.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/oh-my-log
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/oh-my-log.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/oh-my-log.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/oh-my-log
[david-image]: https://img.shields.io/david/ahmadnassri/oh-my-log.svg?style=flat-square
