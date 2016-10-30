var db = require("../modules/db.js");

/*
    给前端提供的接口：
        提交留言(get)  /subMsg
        {st:0}
        返回留言(get)  /setPages?page=1
        {st:0,data:[{id ：随机数,text : text, date : 时间戳}]}
        删除留言(get)  /removeMsg?id=231
        {st:0}

    
 */

exports.getMsg = function (req,res,next) {
   var page = parseInt(req.query.page);
   //console.log(page);

   //当json查询条件为空的时候，即是查找全部
    //{"pagecount":3,"page":(page-1)}
    db.find("msgBook","liuyanben",{},{"pagecount":5,"page":(page-1),"sort":{"date": -1}},function (err,result) {

        if(err){
            console.log(err);
        }
        res.json(result);
    });
}

exports.removeMsg = function (req,res,next) {
   var id = parseInt(req.query.id);
   db.deleteMany("msgBook","liuyanben",{"id":id},function (err,result){
        if(err){
            res.json('删除失败，请重试一下！');
            return;
        }
        res.json('删除信息成功');
    });
}

exports.sumCount = function (req,res,next) {

    db.findAllDate("msgBook","liuyanben",function (count) {
        //console.log(count);
        var counts = Math.ceil(count/5);
        //console.log(counts);
        res.json(counts);
    });
}

exports.doSubmit = function (req,res,next) {
   
   //写入数据库
    db.insertOne("msgBook","liuyanben",{
        id : req.query.id,
        text : req.query.text,
        date : req.query.date
    },function (err,result) {

        if(err){
            res.json('添加数据库失败，请重试一下！');
            return;
        }
        res.json('成功！');
    });
}