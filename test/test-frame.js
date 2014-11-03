var stomp = require("stomp");
var testCase = require("nodeunit/nodeunit").testCase;

module.exports['initialize'] = testCase({
    setUp: function (callback) {
        var stomp_args = {
            port: 61613,
            host: 'localhost',
            debug: false,
            login: 'guest',
            passcode: 'guest',
        };

        this.client = new stomp.Stomp(stomp_args);
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    'port is 61613': function(test) {
        test.equal(this.client.port, 61613);
        test.done();
    },
    'host is localhost': function(test) {
        test.equal(this.client.host, 'localhost');
        test.done();
    },
    'debug is false': function(test) {
        test.equal(this.client.debug, false);
        test.done();
    },
    'login is guest': function(test) {
        test.equal(this.client.login, 'guest');
        test.done();
    },
    'passcode is guest': function(test) {
        test.equal(this.client.passcode, 'guest');
        test.done();
    }
});
module.exports['connect'] = testCase({
    setUp: function (callback) {
        var stomp_args = {
            port: 61613,
            host: 'localhost',
            debug: false,
            login: 'guest',
            passcode: 'guest',
        };
        this.client = new stomp.Stomp(stomp_args);
        this._connect = this.client.connect;
        this.client.connect = function() {
            return true;
        };
        callback();
    },
    tearDown: function (callback) {
        this.client.connect = this._connect;
        callback();
    },
    'should call connect': function(test) {
        test.ok(this.client.connect());
        test.done();
    }
});

module.exports['as_string'] = testCase({
    'should not add extended properties from prototype': function(test) {
        Object.prototype.foo = 'bar';
        var Frame = require('../lib/frame.js').Frame;
        var frame = new Frame();
        frame.build_frame({
            command: 'CONNECT',
            headers: {
                'login': 'somelogin',
                'passcode': 'somepass'
            }
        });

        var frame_text = frame.as_string();
        var foo_in_frame = frame_text.indexOf('foo') !== -1;
        test.equal(
            foo_in_frame,
            false,
            "Frame should not contain the extended property foo"
        );
        test.done()
        delete Object.prototype.foo;
    }
});
