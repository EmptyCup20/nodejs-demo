
//配置后端url
var request = require('request');
var settings = require('../settings');
var query = require('querystring');

var proxy = function() {};

/**
 * 发送ajax请求，分远程模式和本地模式
 * @params {String} jsonPath: 本地模式json路径(本地模式)
 * @params {Object} data: 需要传递的数据(远程模式)
 * @params {Object} javaObj: ajax的类型和url(远程模式)
 * @params {Boolean} isLocal: 是否调用本地模式获取数据，设为true则在远程模式下，该请求也获取本地json
 */
proxy.ajax = function(jsonPath, data, javaObj, isLocal) {
    var post_data = data;
    //远程调试模式
    if (!isLocal && settings.nodeConnectType === "net") {
        path = settings.nginxhost + javaObj.url;

        // 数组的话多加一层解析
        for (var item in post_data) {
            if (Array.isArray(post_data[item]) && item.indexOf("[]") == -1) {
                post_data[item + "[]"] = post_data[item];
                delete post_data[item]
            }
        }
        // get请求则将参数封装到路径下
        if (javaObj.method == "get" && query.encode(post_data, '&', '=').length > 0) {
            path += "?" + query.encode(post_data, '&', '=');
        }
        // 非get请求
        if (javaObj.method !== "get") {
            post_data = query.encode(post_data);
        }
        // 向后端发送ajax请求
        return new Promise(function(resolve, reject) {
            request[javaObj.method ? javaObj.method : "post"](path, {
                form: post_data
            }, function(error, response, data) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(data);
                }
            });
        });
    } else {
        //本地json开发模式
        console.log('local');
    }
};

module.exports = proxy;
