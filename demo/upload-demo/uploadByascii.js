/**
 * Created by xiangxiao3 on 2016/5/9.
 */
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs')
gm = require('gm')
request = require('request');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var appData = req.body.jsonParams;
        var file = appData.params.picData;

        fs.writeFile('demo/upload-demo/dir/test.jpg', file, 'ascii', function(err){
            if(err){
                console.log('写入文件失败');
            }else{
                console.log('保存成功, 赶紧去看看乱码吧');
            }
        })
    }
}).listen(8080);