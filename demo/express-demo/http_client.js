/**
 * Created by xiangxiao3 on 2016/4/8.
 */
var http = require('http');

var qs = require('querystring');

var data = {
    userID: "xxxxx test"
};//这是需要提交的数据


var content = qs.stringify(data);

var options = {
    hostname: '10.20.135.22',
    port: 8080,
    path: '/springmvc02/hello.do',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': content.length
    }
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req.write(content);
req.end();