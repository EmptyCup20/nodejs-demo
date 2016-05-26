/**
 * Created by xiangxiao3 on 2016/5/12.
 */
var http = require('http'),
    util = require('util'),
    fs = require('fs')
    gm = require('gm'),
    request = require('request');

//request.del({
//    url:'https://10.33.39.125:8888/containers/cc_pic',
//    ca : fs.readFileSync("demo/upload-demo/gem/cacert.pem")
//}, function optionalCallback(err, httpResponse, body) {
//    if (err) {
//        return console.error('upload failed:', err);
//    }
//    console.log('Upload successful!  Server responded with:', body);
//});

var formData = {
    upload: fs.createReadStream("demo/upload-demo/dir/xx.jpg")
};
request.post({
    url:'https://10.33.39.125:8888/containers/cc_pic/objects/2222',
    ca : fs.readFileSync("demo/upload-demo/gem/cacert.pem"),
    formData: formData
}, function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
});