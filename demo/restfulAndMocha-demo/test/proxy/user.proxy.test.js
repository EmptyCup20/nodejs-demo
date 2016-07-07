
var userProxy = require('../../proxy/userProxy'),
    testTools = require('../testTools');

describe('User-Proxy', function() {
    it('Proxy: 获取所有用户', function (done) {
        userProxy.restful('get', '', {
            'pageNo': '1',
            'pageSize': '15'
        }).then(function (data) {
            testTools.testProxy(data, done);
        });
    });

    it('Proxy: 获取单个用户', function (done) {
        userProxy.restful('get', '111').then(function (data) {
            testTools.testProxy(data, done);
        });
    });

    it('Proxy: 新增用户', function (done) {
        userProxy.restful('post', '', {
            email: 'mc@gmail.com',
            password: '123'
        }).then(function (data) {
            testTools.testProxy(data, done);
        });
    });

    it('Proxy: 修改用户', function (done) {
        userProxy.restful('put', '222', {
            email: 'bt@gmail.com',
            password: '123'
        }).then(function (data) {
            testTools.testProxy(data, done);
        });
    });

    it('Proxy: 删除单个用户', function (done) {
        userProxy.restful('delete', '333').then(function (data) {
            testTools.testProxy(data, done);
        });
    });

    it('Proxy: 删除批量用户', function (done) {
        userProxy.restful('delete', '', {
            ids: [111, 222, 333]
        }).then(function (data) {
            testTools.testProxy(data, done);
        });
    });
});
