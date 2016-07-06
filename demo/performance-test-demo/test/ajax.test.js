/**
 * Created by xiangxiao3 on 2016/7/6.
 */
var ajaxController = require('../service/ajax_controller.js')
    , expect = require('chai').expect
    , co = require("co");

describe('性能测试', function() {
    it('20个ajax', function(done) {
        var start = new Date();
        console.log(start);

        ajaxController.getUrl('https://www.baidu.com').then(function() {
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            return ajaxController.getUrl('https://www.baidu.com');
        }).then(function(){
            var end = new Date();
            var mid = end - start;
            console.log("done");
            console.log(end);
            console.log(mid);
            done();
        }).catch(function(error){
            //同一处理错误信息
        });
    });
});