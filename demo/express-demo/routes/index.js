var express = require('express'),
    router = express.Router(),
    http = require('http'),
    User = require('../models/user'),
    app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 第一个http测试
 * 通过跨域请求的测试 */
router.get('/firsthttp', function(req, res, next) {
    res.render('firsthttp', null);
});

/* nodejs的websocket 测试 */
router.get('/firstsocket', function(req, res, next) {
    res.render('firstsocket', null);
});

/* nodejs和java的tcp通讯测试
*   nodejs 为客户端，java为服务端
* */
router.get('/clientTCPtest', function(req, res, next) {
    var net = require("net"),
        content = "hello world";
    var socket = net.connect({
        host : "localhost",
        port:6800
    })
    socket.setEncoding("utf8");

    socket.on("connect", function(){
        socket.write(content);
    })
    res.render('clientTCPtest', {
        write : content
    });
});

/* nodejs和java的tcp通讯测试
*   nodejs 为服务端 java为客户端
* */
router.get('/serverTCPtest', function(req, res, next) {
    var net = require("net");
    net.createServer(function(socket){
        socket.on("data", function(data){
            console.log("*********" + data);
        })

        console.log("listening on port 6800");
    }).listen(6800);
    res.render('serverTCPtest', {
        state : "listening on port 6800"
    });
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
