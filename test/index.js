/* global describe, it */

'use strict'

var myLog = require('..')
var chalk = require('chalk')
var format = require('dateformat')
var util = require('util')

require('should')

describe('oh-my-log', function () {
  it('should use default values from package.json', function (done) {
    var log = myLog('TEST', {
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
    var log = myLog('TEST', {
      date: {},
      styles: {},
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
    var log = myLog('TEST', {
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

  it('should not use styles', function (done) {
    var log = myLog('TEST', {
      styles: false,

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
    var log = myLog('TEST', {
      date: false,
      styles: false,

      func: function (message) {
        var expected = util.format('[TEST] : Foo')
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use custom styles', function (done) {
    var log = myLog('TEST', {
      styles: {
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
