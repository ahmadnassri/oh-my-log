/* global describe, it */

'use strict'

var info = require('..')
var chalk = require('chalk')
var format = require('dateformat')
var util = require('util')

require('should')

describe('info', function () {
  it('should return message', function (done) {
    var log = info('TEST', {
      func: function (prefix, message) {
        message.should.be.equal('Foo')

        done()
      }
    })

    log('Foo')
  })

  it('should use default values from package.json', function (done) {
    var log = info('TEST', {
      func: function (prefix, message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[%s] %s:', chalk.red('TEST'), chalk.blue(date))
        prefix.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use internal default values', function (done) {
    var log = info('TEST', {
      date: {},
      colors: {},
      func: function (prefix, message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[%s] %s:', chalk.bold.blue('TEST'), chalk.green(date))
        prefix.should.be.equal(expected)

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
      func: function (prefix, message) {
        var date = format(new Date(), 'isoUtcDateTime')
        var expected = util.format('[%s] %s:', chalk.red('TEST'), chalk.blue(date))
        prefix.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should not use colors', function (done) {
    var log = info('TEST', {
      colors: false,

      func: function (prefix, message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[TEST] %s:', date)
        prefix.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should not displau dates', function (done) {
    var log = info('TEST', {
      date: false,
      colors: false,

      func: function (prefix, message) {
        var expected = util.format('[TEST] :')
        prefix.should.be.equal(expected)

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

      func: function (prefix, message) {
        var date = format(new Date(), 'isoTime')
        var expected = util.format('[%s] %s:', chalk.yellow('TEST'), chalk.green(date))
        prefix.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })
})
