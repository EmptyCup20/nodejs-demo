var express = require('express')
    , router = express.Router()
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , http = require('http')
    , path = require('path')
    , log4js = require('log4js')
    , ejs = require('ejs')
    , co = require('co');

var app = express();

//设置默认端口, 启动views
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*-----------------------------------------------------------log4js--------------------------------------------*/
/*配置log4js*/
log4js.configure({
    appenders: [
        {
            type: 'console'
        }, //控制台输出
        {
            type: "dateFile",
            filename: __dirname + '/logs/cheese.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'dateFileLog'
        }//日期文件格式

    ],
    replaceConsole: true,   //替换console.log,是指将console输出信息转换样式和格式后输出
    levels: {
        dateFileLog: 'INFO'
    }
});
var logger =  log4js.getLogger('dateFileLog');
log4js.replaceConsole(logger); // 执行这个方法，将console输出事件关联到logger其他的appender上

app.use(log4js.connectLogger(logger, {level: 'debug', format: ':method :url'}));


logger.trace('trace');
logger.debug('debug.');
logger.info('info.');
logger.warn('warn.');
logger.error('error!');
logger.fatal('fatal.');


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/log', function (req, res, next) {
    co(function *() {
        var msg = req.url +'\n'+ JSON.stringify(req.headers);
        res.render('log', {msg: msg.id.id}); //模拟undefined错误，500错误  msg.id为undefined
    }).catch(err =>{
        next(new Error(err));
    });
});


app.use('/', router);
app.use('/log', router);

//统一错误判断
app.use(function (err, req, res, next) {
    var resError;
    res.status(err.status || 500);
    err.message = err.stack || err.message;  //err.stack提前，输出信息更完整
    console.error(err.message);
    res.render('error/500', {
        error: err.message
    });
});

// catch 404 and forward to error handler
// 404报错页面跳转
app.use(function (req, res, next) {
    var url = req.originalUrl;
    var err = new Error('Not Found');
    console.error(url);
    console.error(err.stack);
    err.status = 404;
    res.render("error/404", {
        error: err.stack
    })
});


//socket 服务
var server = http.createServer(app);
//启动server
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});