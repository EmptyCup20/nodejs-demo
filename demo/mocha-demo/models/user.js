var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function User(user){
    this._id = user._id;
    this.name = user.name;
    this.age = user.age;
    this.gender = user.gender;
    this.province = user.province;
    this.city = user.city;
    this.minority = user.minority;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
    var _id = this._id;
    //要存入数据库的用户文档
    var user = {
        name: this.name,
        age: this.age,
        gender: this.gender || "",
        province: this.province || "",
        city: this.city || "",
        minority: this.minority || ""
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            if(_id){
                //更新用户内容
                collection.update({
                    _id: new ObjectID(_id)
                }, {
                    $set: user
                }, function (err, data) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, user);
                });
            }else{
                //将用户数据插入 users 集合
                collection.insert(user, {
                    safe: true
                }, function (err, user) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//错误，返回 err 信息
                    }
                    callback(null, user.ops[0]);//成功！err 为 null，并返回存储后的用户文档
                });
            }
        });
    });
};

//删除一篇文章
User.remove = function(_id, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、日期和标题查找并删除一篇文章
            collection.remove({
                "_id": new ObjectID(_id)
            }, {
                w: 1
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//读取用户信息
User.get = function(name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //查找用户名（name键）值为 name 一个文档
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};