/**
 * Created by xiangxiao3 on 2016/3/15.
 */
// redis 链接
var redis   = require('redis');
var client  = redis.createClient({
    host : '10.33.39.80',
    port : '6379',
    password : 'redisOfhik123+',
    db : 1
});
// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});
// set
var info = {};
info.baidu = 'www.baidu.com1111';
info.sina  = 'www.sina.com';
info.qq    = 'www.qq.com';
var info = {sessionId : "Y2LpXDIVZdabT-mwYceEJd3kNnZKh7CY"};
client.hmset('user:xx', info, function(error, res){
    if(error) {
        console.log(error);
    } else {
        console.log(res);
    }
    client.expire('user:xx', 5);
    // 关闭链接
    client.end(true);
});

//get
//client.hgetall('user:1', function(error, res) {
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(res);
//    }
//
//    // 关闭链接
//    client.end(true);
//});
//del
//client.del('user:1', function(error, res) {
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(res);
//    }
//
//    // 关闭链接
//    client.end(true);
//});