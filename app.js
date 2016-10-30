var express = require("express");
var app = express();
var router = require("./routers/routers.js");

app.use(express.static("./public"));

//显示留言
app.get('/getMsg',router.getMsg);
//处理提交留言
app.get('/doSubmit',router.doSubmit);
//返回总共有多少页
app.get('/sumCount',router.sumCount);
//删除留言
app.get('/removeMsg',router.removeMsg);
app.listen('8000');