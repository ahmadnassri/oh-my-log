/* global describe, it */

'use strict'

var info = require('..')
var chalk = require('chalk')
var format = require('dateformat')
var util = require('util')

require('should')

describe('info', function () {
  it('should use default values from package.json', function (done) {
    var log = info('TEST', {
      func: function (message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[%s] %s: Foo', chalk.red('TEST'), chalk.blue(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use internal default values', function (done) {
    var log = info('TEST', {
      date: {},
      colors: {},
      func: function (message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[%s] %s: Foo', chalk.bold.blue('TEST'), chalk.green(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use custom date format', function (done) {
    var log = info('TEST', {
      date: {
        format: 'isoUtcDateTime'
      },
      func: function (message) {
        var date = format(new Date(), 'isoUtcDateTime')
        var expected = util.format('[%s] %s: Foo', chalk.red('TEST'), chalk.blue(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should not use colors', function (done) {
    var log = info('TEST', {
      colors: false,

      func: function (message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[TEST] %s: Foo', date)
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should not display dates', function (done) {
    var log = info('TEST', {
      date: false,
      colors: false,

      func: function (message) {
        var expected = util.format('[TEST] : Foo')
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use custom colors', function (done) {
    var log = info('TEST', {
      colors: {
        name: 'yellow',
        date: 'green'
      },

      func: function (message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[%s] %s: Foo', chalk.yellow('TEST'), chalk.green(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })
})
