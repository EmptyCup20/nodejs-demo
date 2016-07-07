
var request = require('request'),
    expect = require('chai').expect,
    query = require('querystring');

var testTools = function () {};

module.exports = testTools;

/**
 * 测试Java端接口是否正确
 * @params {Object} data: 后端返回的数据
 * @params {Object} done: mocha结束测试用例的方法
 */
testTools.testProxy = function(data, done) {
    expect(data.code).to.be.equal(0);
    console.log(data);
    console.log('\n');
    done();
};

/**
 * 测试Node端controller接口是否正确
 * @params {String} method: http请求方式
 * @params {String} path: http请求路径
 * @params {Object} data: post/put/delete请求发送的数据
 * @params {Object} done: mocha结束测试用例的方法
 */
testTools.testController = function(method, path, data, done) {
    // get请求则将参数封装到路径下
    if(method == "get" && query.encode(data, '&', '=').length > 0){
        path += "?" + query.encode(data, '&', '=');
    }
    // 非get请求
    if(method !== "get"){
        data = query.encode(data);
    }
    // 发送http请求
    request[method](path, {form: data}, function (error, response, data) {
        data = JSON.parse(data);
        expect(data.code).to.be.equal(0);
        console.log(data);
        console.log('\n');
        done();
    });
};