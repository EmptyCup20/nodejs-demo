/**
 * Created by xiangxiao3 on 2016/7/6.
 */
var request = require("request");

//request.get('https://api.github.com', function (error, response, data) {
//    if (!error && response.statusCode == 200) {
//        resolve(data);
//    }else{
//        reject(new Error(this.statusText));
//    }
//})

request('https://www.baidu.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
    }
})