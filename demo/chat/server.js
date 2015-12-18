    //http服务
    var http = require("http"),
        //内置文件服务
        fs = require("fs"),
        //内置path模块
        path = require("path"),
        //mime模块不是很懂
        mime = require("mime"),
        //chat_server模块
        charServer = require('./lib/chat_server');

    var cache = {};

    //发送文件
    function sendFile(res, filePath, fileContents){
        res.writeHead(
            200,
            {"content-type": mime.lookup(path.basename(filePath))}
        );
        res.end(fileContents);
    }
    //发送一个404
    function send404(res){
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.write('Error 404: resource not found');
        res.end();
    }
    //提供静态文件服务
    function serverStatic(res, cache, absPath){
        //是否缓存
        if(cache[absPath]){
            sendFile(res, absPath, cache[absPath]);
        }else{
            //是否存在连接
            fs.exists(absPath, function(exists){
                if(exists){
                    fs.readFile(absPath, function(err, data){
                        if(err){
                            send404(res);
                        }else{
                            cache[absPath] = data;
                            sendFile(res, absPath, data);
                        }
                    })
                }else{
                    send404(res);
                }
            })
        }
    }
    //创建服务
    var server = http.createServer(function(req, res){
        var filePath = false;

        if(req.url == "/"){
            filePath = 'public/index.html';
        }else{
            filePath = 'public' + req.url;
        }

        var absPath = './' + filePath;
        serverStatic(res, cache, absPath);
    })

    server.listen(3000, function(){
        console.log("server listening on port 3000.");
    })

    charServer.listen(server);