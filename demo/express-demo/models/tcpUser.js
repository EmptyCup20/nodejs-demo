/**
 *
 * @Author xiangxiao3
 * @Date   2016/1/14
 *
 */
var net = require("net");

/**
 * int转换为buffer方法
 */
var toBigEndian = function(i) {
    var bytes = [];
    bytes[0] = i >>> 24;
    bytes[1] = i >>> 16;
    bytes[2] = i >>> 8;
    bytes[3] = i;
    return bytes;
}


module.exports = function(sendType, sendData, callback){

    var client = net.connect({
        host : "localhost",
        port:6800
    });
    client.on("connect", function(){
        var chunks = [], size = 0, temp = new Buffer(sendType, "utf-8");
        size += temp.length;
        chunks.push(temp);

        if(sendData){
            var sendDataBuf = new Buffer(sendData, "utf-8"),
                sendDataBufLen = new Buffer(toBigEndian(sendDataBuf.length));

            //第二缓冲数据 字节长度
            size += sendDataBufLen.length;
            chunks.push(sendDataBufLen);
            //第三缓冲数据
            size += sendDataBuf.length;
            chunks.push(sendDataBuf);
        }

        temp = Buffer.concat(chunks, size);
        client.write(temp);
    });
    var chunks = [],size = 0;
    client.on("data", function(chunk){
        chunks.push(chunk);
        size += chunk.length;
    })

    client.on("end", function(){
        var buf = Buffer.concat(chunks, size);

        //前2位是接口类型
        var inter = buf.toString("utf8", "0", "2");

        //后两位是数据类型
        var type = buf.toString("utf8", "2", "6");

        //后之后是数据
        var data = buf.toString("utf8", "6");

        if(callback){
            callback({
                inter : inter,
                type : type,
                data : data
            })
        }
    })
}