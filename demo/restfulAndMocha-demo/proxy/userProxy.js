
var proxy = require("./config.js");

function User(user) {}

module.exports = User;

// 用户的增删改查操作
User.restful = function(method, id, data) {
    return new Promise(function(resolve, reject) {
        var path = id ? '/java/user/' + id :  '/java/user';
        proxy.ajax("/java/user", data, {
            method : method,
            url : path
        }).then(function(data){
            resolve(data);
        }, function(data){
            reject(data);
        });
    });
};
