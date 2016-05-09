/**
 * Created by xiangxiao3 on 2016/5/5.
 */
//需要安装 GraphicsMagick
var gm = require('gm')
    ,  fs = require('fs');
    gm( 'demo/upload-demo/dir/xx.png')
    .resize(58, 50)
    .write('demo/upload-demo/dir/resize.jpg', function(err){
            if (err) return console.dir(arguments)
            console.log(this.outname + " created  ::  " + arguments[3])
        }
    )