/**
 * Created by xiangxiao3 on 2016/4/27.
 */
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    path = require('path'),
    fs = require('fs')
    gm = require('gm'),
    request = require('request');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {

        // parse a file upload
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = 'demo/upload-demo/dir';	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

        form.parse(req, function(err, fields, files) {
            if (err) {
                res.write('error\n\n');
                return;
            }
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            //res.end(util.inspect({fields: fields, files: files}));
            //删除文件

            //这边循环跑上传，会出现死循环 -_-
            var formData = {
                // Pass a simple key-value pair
                userId  : '1',
                storeId  : '1',
                // Pass data via Streams
                upload: fs.createReadStream(files.upload.path)
            };
            //request.post({url:'http://10.20.135.22:5566/control/core/video/uploadCatch', formData: formData}, function optionalCallback(err, httpResponse, body) {
            //    if (err) {
            //        return console.error('upload failed:', err);
            //    }
            //    console.log('Upload successful!  Server responded with:', body);
            //});
            request.del({
                url:'https://10.33.39.125:8888/containers/cc_pic',
                ca : fs.readFileSync("demo/upload-demo/gem/cacert.pem")
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);
            });
            //fs.unlinkSync(files.upload.path);
        });

        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
}).listen(8080);