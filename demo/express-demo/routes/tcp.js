var express = require('express'),
    router = express.Router(),
    http = require('http'),
    TcpUser = require('../models/tcpUser');

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

/* nodejs和java的tcp通讯todo测试
 * */
router.get('/tcpList', function(req, res, next) {
    res.render('tcpList', {
        title : "tcp todo"
    });
});

/* nodejs和java的tcp通讯todo测试 getTcpList
 * */
router.post('/tcp/getTcpList', function(req, res, next) {
    //后端04为查询的数据
    TcpUser("04", null, function(data){
        var tcpList = JSON.parse(data.data.trim());

        res.send(tcpList);
    })
});

/* nodejs和java的tcp通讯todo测试 saveUser
 * */
router.post('/tcp/saveUser', function(req, res, next) {
    //后端01为添加用户
    TcpUser("01", JSON.stringify(req.query), function(data){
        res.send("success");
    })
});


/* nodejs和java的tcp通讯todo测试 removeUser
 * */
router.post('/tcp/removeUser', function(req, res, next) {
    //后端01为添加用户
    TcpUser("03", JSON.stringify(req.query), function(data){
        res.send("success");
    })
});

module.exports = router;