/**
 * Created by xiangxiao3 on 2016/7/5.
 */
var yieldController = require('../service/yield_controller.js')
    , expect = require('chai').expect
    , co = require("co");

describe('性能测试', function() {
    it('20个yield', function(done) {
        co(function*() {
            var start = new Date();
            console.log(start);
            for(var i = 0; i < 20; i ++ ){
                yield yieldController.getUrl('https://www.baidu.com');
            }
            var end = new Date();
            var mid = end - start;
            console.log("done");
            console.log(end);
            console.log(mid);
            done();
        }).catch(err => next(new Error(err)));
    });
});
