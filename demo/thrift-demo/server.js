/**
 * Created by xiangxiao3 on 2016/3/9.
 */
var thrift = require('thrift');
var demo = require('./file/gen-nodejs/DemoService.js');
var demoTypes = require('./file/gen-nodejs/DemoService_types.js');

var server = thrift.createServer(demo, {
    sayHi: function(name) {
        console.log("server stored:", name);
        return "xxx"
    }
});

server.listen(7911);
console.log('server start');