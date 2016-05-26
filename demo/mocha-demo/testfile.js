/**
 * Created by xiangxiao3 on 2016/5/17.
 */
var Mocha = require("mocha");

var mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'test',
        reportName: 'customReportName',
        reportTitle: 'customReportTitle',
        inlineAssets: true
    }
});
