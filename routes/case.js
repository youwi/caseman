var express = require('express');
var router = express.Router();
var fs=require("fs");
var path = require('path');

var tmpcache="";
fs.readFile(path.join(__dirname, 'pad.html'),function(err,data){
    tmpcache=data;
});


router.use("/caseAdd", function(request, response, next) {

    var newfilename=path.join(__dirname,'..',"public",request.body.filename);

    mkdirsSync(request.body.filename,0777);
    if(!fs.existsSync(newfilename))
        fs.writeFile(newfilename,"空白内容",function(err){
            if(err)
                console.log(err+"新建文件出错"+newfilename);
        });
    response.end();
});

router.use("/caseList", function(request, response, next) {

    console.log("获取列表 caseList")
    response.send( JSON.stringify(geFileList( __dirname+"/../cases") ));

});

router.use("/caseSave", function(request, response, next) {


    var url=require("url");
    var filename=url.parse(request.body.filename).pathname;
    var realname=path.join(__dirname,"..","cases",filename);

    fs.writeFile(realname,request.body.wikiContent,function(err){
        if(err){
            console.log(err+request.body.filename,request.body.wikiContent);
            response.send("保存失败"+err);
        }

        else{
            response.send("保存ok");
        }

    });
   // response.send("ok");
 //   next();
   // console.log(request.body.filename,request.body.wikiContent);

});

router.use("/caseRun", function(request, response, next) {

    var url=require("url");
    var filename=url.parse(request.body.filename).pathname;
    var realname=path.join(__dirname,"..","cases",filename);


    var child=require("child_process");
    child.exec("node "+realname,function(error, stdout, stderr){

    });
    fs.readFile( realname,function(err,data){
        try{
             var out= eval(data);

        }catch(err){
            response.send("err"+err);
        }
        response.send(out);
    });


});


function geFileList(path){
    var filesList =new Object();
    readFile(path,filesList);
    return filesList;
}

function readFile(path,filesList){
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file)
    {
        states = fs.statSync(path+'/'+file);
        if(states.isDirectory())
        {
        if(
         file=="css"
        ||file=="js"
        ||file=="ckeditor"
        ||file=="fonts") return;
            filesList[file]=new Object();//目录节点
            readFile(path+'/'+file,filesList[file]);
        }
        else
        {
            //filesList[file]
            //创建一个对象保存信息
           // var obj = new Object();
           // obj.size = states.size;//文件大小，以字节为单位
           // obj.name = file;//文件名
         //   obj.path = path+'/'+file; //文件绝对路径
           if( !filesList.filename  ) filesList.filename=[];
            filesList.filename.push(file);
        }
    }
}

function mkdirsSync(dirpath, mode) {

    process.chdir(path.join(__dirname,"..","public"));
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
       // var count;
        dirpath.split(path.sep).forEach(function(dirname) {
            if ((dirname.indexOf(".html") > -1
            ||dirname.indexOf(".htm")  > -1
            ||dirname.indexOf(".")  > -1
            || dirname.indexOf(".txt")  >-1 )) return;
            if(dirname=="") return;
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}




module.exports = router;
