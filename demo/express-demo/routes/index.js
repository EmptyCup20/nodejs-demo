var express = require('express'),
    router = express.Router(),
    http = require('http'),
    User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET firstsocket page. */
router.get('/firstsocket', function(req, res, next) {
  res.render('firstsocket', null);
});

/* GET firstsocket page. */
router.get('/firsthttp', function(req, res, next) {
  res.render('firsthttp', null);
});

/* 模拟一个post 方法 保存用户 xx */
router.post('/saveUser', function(req, res) {
    var user = new User(req.query);
    user.save(function(message, data){
        res.send(data);
    });
});

/* 模拟一个post 方法 获取所有用户 xx */
router.post('/getUsers', function(req, res) {
    User.get(null, function(message, data){
        res.send(data);
    });
});

/* 模拟一个post 方法 删除用户 xx */
router.post('/removeUser', function(req, res) {
    User.remove(req.query._id, function(message, data){
        res.send(data);
    });
});

module.exports = router;
