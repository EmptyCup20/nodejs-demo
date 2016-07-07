/**
 * 用户管理控制器
 */
var express = require('express');
var router = express.Router();
var co = require('co');
var userProxy = require("../../proxy/userProxy");

/* 获取所有用户 */
router.get('/', function(req, res, next) {
    co(function*() {
        var query = req.query;
        res.send(yield userProxy.restful('get', '', query));
    }).catch(err => {
        next(new Error(err));
    });
});

/* 获取单个用户 */
router.get('/:userId', function(req, res, next) {
    co(function*() {
        var query = req.query;
        res.send(yield userProxy.restful('get', req.params.userId, query));
    }).catch(err => {
        next(new Error(err));
    });
});

/* 新增用户 */
router.post('/', function(req, res, next) {
    co(function*() {
        var query = req.body;
        res.send(yield userProxy.restful('post', '', query));
    }).catch(err => {
        next(new Error(err));
    });
});

/* 修改用户 */
router.put('/:userId', function(req, res, next) {
    co(function*() {
        var query = req.body;
        res.send(yield userProxy.restful('put', req.params.userId, query));
    }).catch(err => {
        next(new Error(err));
    });
});

/* 删除单个用户 */
router.delete('/:userId', function(req, res, next) {
    co(function*() {
        var query = req.body;
        res.send(yield userProxy.restful('delete', req.params.userId));
    }).catch(err => {
        next(new Error(err));
    });
});

/* 删除批量用户 */
router.delete('/', function(req, res, next) {
    co(function*() {
        var query = {
            ids: req.body.ids.split(',')
        };
        res.send(yield userProxy.restful('delete', '', query));
    }).catch(err => {
        next(new Error(err));
    });
});

module.exports = router;
