/**
 * Created by xiangxiao3 on 2016/3/23.
 */
var User = require('../../models/user');
var request = require('superagent');
var expect = require('chai').expect;

//不能再describe中直接去访问mongodb
//可以访问必须加参数done
describe('User.get()', function(){
    it('获取用户', function(done){
        User.get(null, function(message, data){
            expect(data).to.be.an('Array');
            done()
        });
    })

    it('异步请求应该返回一个对象', function(done){
        request
            .get('https://api.github.com')
            .end(function(err, res){
                expect(res).to.be.an('object');
                done();
            });
    });
});