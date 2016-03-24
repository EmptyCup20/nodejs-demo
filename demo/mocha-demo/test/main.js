/**
 * Created by xiangxiao3 on 2016/3/23.
 */
var expect = require('chai').expect;
describe('main,indexOf()', function(){
    it('should return -1 when not present', function(){
        expect([1,2,3].indexOf(4)).to.be.equal(-1);
    })
});