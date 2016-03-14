/**
 * Created by xiangxiao3 on 2016/3/9.
 */
var thrift = require('thrift');
var demo = require('./file/gen-nodejs/DemoService.js');
var demoTypes = require('./file/gen-nodejs/DemoService_types.js');


var connection = thrift.createConnection('10.20.134.19', 9090),
//var connection = thrift.createConnection('localhost', 7911),

    client = thrift.createClient(demo, connection);

//连接

connection.on('error', function(err) {

    console.error(err);

});

console.log(client.sayHi('tomdog').toString());