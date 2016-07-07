
var userProxy = require('../../proxy/userProxy'),
    testTools = require('../testTools');

describe('User-Controller', function() {
    it('Controller: 获取所有用户', function (done) {
        var method = 'get',
            path = 'http://localhost:3000/control/user',
            data = {
                'pageNo': '1',
                'pageSize': '15'
            };
        testTools.testController(method, path, data, done);
    });

    it('Controller: 获取单个用户', function (done) {
        var method = 'get',
            path = 'http://localhost:3000/control/user/111',
            data = {};
        testTools.testController(method, path, data, done);
    });

    it('Controller: 新增用户', function (done) {
        var method = 'post',
            path = 'http://localhost:3000/control/user',
            data = {
                'email': 'mc@gmail.com',
                'password': '123'
            };
        testTools.testController(method, path, data, done);
    });

    it('Controller: 修改用户', function (done) {
        var method = 'put',
            path = 'http://localhost:3000/control/user/222',
            data = {
                'email': 'bt@gmail.com',
                'password': '123'
            };
        testTools.testController(method, path, data, done);
    });

    it('Controller: 删除单个用户', function (done) {
        var method = 'delete',
            path = 'http://localhost:3000/control/user/333',
            data = {};
        testTools.testController(method, path, data, done);
    });

    it('Controller: 删除批量用户', function (done) {
        var method = 'delete',
            path = 'http://localhost:3000/control/user',
            data = {
                ids: '111,222,333'
            };
        testTools.testController(method, path, data, done);
    });
});