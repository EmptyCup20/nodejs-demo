/**
 * Created by xiangxiao3 on 2016/7/5.
 */
var
    controller = function controller() {}
    , http = require('http')
    , request = require('request');

controller.getUrl = function(url){
    var promise = new Promise(function(resolve, reject){
        request.get(url, null, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                resolve(data);
            }else{
                reject(new Error(this.statusText));
            }
        })
    })
    return promise;
}

module.exports = controller;