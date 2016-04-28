/**
 * Created by xiangxiao3 on 2016/4/8.
 */
var http = require("http");
http.createServer(function(req, res){
    res.writeHead(200, {"Contest-Type": "text-plain"});
    res.end("Hello World\n");
}).listen(1337, "127.0.0.1");
console.log("server on 127.0.0.1:1337");