/**
 * 用户管理控制器
 */
var express = require('express');
var router = express.Router();

/* 获取所有用户 */
router.get('/', function(req, res, next) {
    res.send({
        code: 0,
        data: req.query,
        success: true,
        message: '获取所有用户成功'
    });
});

/* 获取单个用户 */
router.get('/:userId', function(req, res, next) {
    req.query.userId = req.params.userId;
    res.send({
        code: 0,
        data: req.query,
        success: true,
        message: '获取单个用户成功'
    });
});

/* 新增用户 */
router.post('/', function(req, res, next) {
    res.send({
        code: 0,
        data: req.body,
        success: true,
        message: '新增用户成功'
    });
});

/* 修改用户 */
router.put('/:userId', function(req, res, next) {
    req.body.userId = req.params.userId;
    res.send({
        code: 0,
        data: req.body,
        success: true,
        message: '修改用户成功'
    });
});

/* 删除用户 */
router.delete('/:userId', function(req, res, next) {
    req.body.userId = req.params.userId;
    res.send({
        code: 0,
        data: req.body,
        success: true,
        message: '删除单个用户成功'
    });
});

/* 删除用户 */
router.delete('/', function(req, res, next) {
    res.send({
        code: 0,
        data: req.body,
        success: true,
        message: '删除批量用户成功'
    });
});

module.exports = router;
