'use strict'

var chalk = require('chalk')
var config = require('pkg-config')('info')
var format = require('dateformat')
var util = require('util')

// [BS] 12:33
module.exports = function (name, options) {
  // date options
  var date = options.date !== undefined ? options.date : config.date !== undefined ? config.date : {}

  // color options
  var colors = options.colors !== undefined ? options.colors : config.colors !== undefined ? config.colors : {}

  // general options
  var opts = {
    func: options.func || console.log,
    date: date === false ? false : {
      format: date.format || 'hh:MM:ss TT'
    },
    colors: colors === false ? false : {
      name: colors.name || ['blue', 'bold'],
      date: colors.date || ['green']
    }
  }

  // magic starts here
  return function () {
    var now = ''
    var args = Array.prototype.slice.call(arguments)

    if (opts.date !== false) {
      now = format(new Date(), opts.date.format)
    }

    // lets set some colors
    if (opts.colors !== false) {
      now = chalk[opts.colors.date](now)

      // ensure array
      opts.colors.name = Object.prototype.toString.call(opts.colors.name) === '[object Array]' ? opts.colors.name : [opts.colors.name]

      opts.colors.name.forEach(function (style) {
        name = chalk[style](name)
      })
    }

    // make this the first argument
    args.unshift(util.format('[%s] %s:', name, now))

    // pass along to the logger functions
    opts.func.apply(null, args)
  }
}
