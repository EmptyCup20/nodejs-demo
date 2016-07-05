/**
 * Created by xiangxiao3 on 2016/7/5.
 */
var yieldController = require('../service/yield_controller.js')
    , expect = require('chai').expect
    , co = require("co")
    , request = require("request");

describe('性能测试', function() {
    it('yield', function() {
        request.get('https://api.github.com', null, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                resolve(data);
            }else{
                reject(new Error(this.statusText));
            }
        })
        //co(function*() {
        //    //for(var i = 0; i < 10; i ++){
        //        var data = yield yieldController.getUrl('https://api.github.com');
        //    //}
        //    //expect(res).to.be.an('object');
        //    console.log("done");
        //    done();
        //}).catch(err => next(new Error(err)));
    });
});
