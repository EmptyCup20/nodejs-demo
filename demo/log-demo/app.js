var express = require('express')
    , router = express.Router()
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , http = require('http')
    , path = require('path')
    , log4js = require('log4js')
    , ejs = require('ejs');

var app = express();

//设置默认端口, 启动views
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// log4js.loadAppender('file');
//
// // log4js.addAppender(log4js.appenders.console());
// log4js.addAppender(log4js.appenders.file(__dirname + '/logs/cheese.log'), 'cheese');
// var logger = log4js.getLogger('cheese');
// logger.setLevel('INFO');


log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"
        }, //控制台输出
        {
            type: "dateFile",
            filename: __dirname + '/logs/cheese.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'dateFileLog'
        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'INFO'
    }
});

var logger = log4js.getLogger('dateFileLog');

app.use(log4js.connectLogger(logger, {level:'debug', format:':method :url'}));

console.info('info.');
console.warn('warn.');
console.error('error!');

// logger.trace('trace');
// logger.debug('debug.');
logger.info('info.');
// logger.warn('warn.');
// logger.error('error!');
// logger.fatal('fatal.');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//socket 服务
var server = http.createServer(app);
//启动server
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});