/**
 * Created by xiangxiao3 on 2016/3/23.
 */
var add = require('../../service/myservice.js');
var expect = require('chai').expect;

describe('myservice.add()', function() {
    it('任何数加0应该等于自身', function() {
        expect(add(1, 0)).to.be.equal(1);
    });
});
