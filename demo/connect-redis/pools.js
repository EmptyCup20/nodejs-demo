/**
 * Created by xiangxiao3 on 2016/7/1.
 */
// redis 链接
var redis_controller   = require('./tools/redis_pool_controller'),
    co = require('co');
// set
var info = {};
info.baidu = 'www.baidu.com';
info.sina  = 'www.sina.com';
info.qq    = 'www.qq.com';
co(function*() {
    for(;;){
        yield redis_controller.setData("user:xx", info);
        yield redis_controller.getData("user:xx");
        yield redis_controller.delData("user:xx");
    }
}).catch(err => console.log(new Error(err)));