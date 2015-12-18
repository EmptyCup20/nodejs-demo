var fs = require("fs");
fs.readFile("test.json", function(er, data){
    console.log(data)
})