/**
 * Created by xiangxiao3 on 2016/7/1.
 * redis连接池测试
 */
var
    poolModule = require('generic-pool')
    ,redis = require('redis');

var tpool
    , redisCotroller = function(){};

//单例
var startPool = function(){
    if(!tpool){
        tpool = poolModule.Pool({
            name     : 'mysql',
            //将建 一个 连接的 handler
            create   : function(callback) {
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

                callback(null, client);
            },
            // 释放一个连接的 handler
            destroy  : function(client) { client.quit(); },
            // 连接池中最大连接数量
            max      : 30,
            // 连接池中最少连接数量
            min      : 2,
            // 如果一个线程3秒钟内没有被使用过的话。那么就释放
            idleTimeoutMillis : 30000,
            // 如果 设置为 true 的话，就是使用 console.log 打印入职，当然你可以传递一个 function 最为作为日志记录handler
            log : false
        });
    }
    return tpool;
}


//redis插入数据
redisCotroller.setData = function(key, obj){
    return new Promise(function(resolve, reject) {
        var pool = startPool();
        pool.acquire(function(err, client) {

            client.hmset(key, obj, function(error, res){
                if(error) {
                    console.log("hmset error:" + error);
                    reject(error);
                } else {
                    console.log("hmset data:" + res);
                    resolve(res);
                }
                client.expire(key, 12000);
            });
            pool.release(client);
        });
    })
}

//redis获取数据  type hgetall 取对象 get 取字符串
redisCotroller.getData = function(key, type){
    if(!type){
        type = "hgetall";
    }
    return new Promise(function(resolve, reject) {
        var pool = startPool();
        pool.acquire(function(err, client) {

            client[type](key, function (error, res) {
                if (error) {
                    console.log("hgetall error:" + error);
                    reject(error);
                } else {
                    //console.log("hgetall data:" + res);
                    resolve(res);
                }
            });
            pool.release(client);
        })
    })
}

//redis删除数据
redisCotroller.delData = function(key){
    return new Promise(function(resolve, reject) {
        var pool = startPool();
        pool.acquire(function(err, client) {

            client.del(key, function(error, res) {
                if(error) {
                    console.log("delData error:" + error);
                    reject(error);
                } else {
                    //console.log("delData data:" + res);
                    resolve(res);
                }
            });
            pool.release(client);
        })
    })
}

module.exports = redisCotroller;
