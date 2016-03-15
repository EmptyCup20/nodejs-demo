/**
 * Created by xiangxiao3 on 2016/3/15.
 */
// redis 链接
var redis   = require('redis');
var client  = redis.createClient('6379', '10.33.39.55');
// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});
// redis 验证 (reids.conf未开启验证，此项可不需要)
client.auth("redisOfhik123+");

client.get('username', function(error, res) {
    if(error) {
        console.log(error);
    } else {
        console.log(res);
    }

    // 关闭链接
    client.end();
});