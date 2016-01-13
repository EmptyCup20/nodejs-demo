var express = require('express'),
    router = express.Router(),
    http = require('http');

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

module.exports = router;