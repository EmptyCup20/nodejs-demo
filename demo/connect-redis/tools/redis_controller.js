/**
 * Created by xiangxiao3 on 2016/6/30.
 */
var redisCotroller = function(){},
    redis   = require('redis');

//redis插入数据
redisCotroller.setData = function(key, obj){
    return new Promise(function(resolve, reject) {
        var client = connectRedis();

        client.hmset(key, obj, function(error, res){
            if(error) {
                console.log("hmset error:" + error);
                reject(error);
            } else {
                //console.log("hmset data:" + res);
                resolve(res);
            }
            client.expire(key, 12000);
            // 关闭链接
            client.end(true);
        });
    })
}

//redis获取数据  type hgetall 取对象 get 取字符串
redisCotroller.getData = function(key, type){
    if(!type){
        type = "hgetall";
    }
    return new Promise(function(resolve, reject) {
        var client = connectRedis();

        client[type](key, function(error, res){
            if(error) {
                console.log("hgetall error:" + error);
                reject(error);
            } else {
                //console.log("hgetall data:" + res);
                resolve(res);
            }
            // 关闭链接
            client.end(true);
        });
    })
}

//redis删除数据
redisCotroller.delData = function(key){
    return new Promise(function(resolve, reject) {
        var client = connectRedis();

        client.del(key, function(error, res) {
            if(error) {
                console.log("delData error:" + error);
                reject(error);
            } else {
                //console.log("delData data:" + res);
                resolve(res);
            }

            // 关闭链接
            client.end(true);
        });
    })
}

//建立redis链接
var connectRedis = function(){
    // redis 链接
    var client  = redis.createClient({
        host : '10.33.40.132',
        port : '31379',
        password : 'redisOfhik123+',
        db : 1
    });

    // redis 链接错误
    client.on("error", function(error) {
        console.log("error:" + error);
    });

    return client;
}

module.exports = redisCotroller;