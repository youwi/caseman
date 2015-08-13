



var currfile="";//正在编辑的文件名,全名
var currroot="";
var editor_tree;
var editor_text;
var editor_ace;
var editor_out_json;
var editor_out_raw;
var ace_editor;

function buildTree(node,dir){
    //domtree+="<li>root";
    var domtree="";
    dir=dir||"";
    for(child in node){


        if(child!="filename")
        {
            domtree+="<li>"+child;
            domtree+=buildTree(node[child],dir+"/"+child);
            domtree+="</li>\n";

        }else{

            domtree+="<ul>"
            for(var i=0;i< node[child].length;i++)
                domtree+="\t\t<li><a href='"+dir+"/"+node[child][i]+"'>"+node[child][i]+"</a></li>\n";

        }
    }
    domtree+="</ul>\n";

    return domtree||"";

}


$("#newfile").click(function () {
    $.post('/wikiAdd', {
        filename: thfilename.value,

    }, function (data) {

    });
});
$("#tagop").click(function () {
    $("#tagedit").slideToggle("slow");
});
$("#tagtask").click(function () {

});
$("#edit").click(function () {
    window.frames.if.document.designMode = 'on';
});
$("#save").click(save=function () {
   // var filename = $('#WikiContent').data("file");

    $.post('/caseSave', {

        filename: currfile,
        wikiContent: ace_editor.getValue()
    }, function (data) {
        alert(data);
    });
});
$("#upload").click(function () {
    //alert("#upload");
    $("#uppc")[0].click();
    upac();
});



function init(){

    $.getJSON("/caseList?root="+$("myroot").val(),function(json){

        var domtree="<li>root\n";
        domtree= buildTree(json);
        domtree +="</li>";
        tmp2=domtree;
        $("#treeroot").append(domtree);
        $('#treeroot').treed();


        $("#treeroot a").click(function(){
            currfile=$(this)[0].href;

            $.ajax({
                url: currfile,
                method:"GET",
                success:suc=function(data){
                    var json;
                    try{
                        json= JSON.parse(data)
                    }catch(e){
                        json={"转换为:":data};
                        console.log("转换出错");
                    }
                    editor_text.set(json);
                    editor_tree.set(json);
                    ace_editor.setValue(data);
                },
                error:function(err){
                    //如果是js文件加载执行以后
                    //readyState: 4, responseText: "{"a":"aaaa"↵}", status: 200, statusText: "OK"}
                    if(err.status==200){
                        suc(err.responseText)
                        //editor_text.set(JSON.parse(err.responseText));
                        //editor_tree.set(JSON.parse(err.responseText));
                        //ace_editor.setValue(err.responseText);
                    }
                     console.log("出错");
                }
            });
            //
            //$.get(currfile, function (data) {
            //
            //    editor_text.set(cc);
            //    editor_tree.set(cc);
            //    ace_editor.setValue(data);
            //    //alert(data);
            //});




            return false;
        })
//
//        $("#treeroot a").each(function(){
//
////        $(this)[0].oncontextmen=function(){
////            return false;
////        };
//            $(this).mousedown(function(e){
//                var key = e.which; // 鼠标键位（右键3，左键1，滚轮2）
//                if(key == 3){
//                    var x = e.clientX;
//                    var y = e.clientY;
//                    $(".text").html("X: "+x+" Y: "+y);
//                    $(".desk").show().css({left:x,top:y});
//                }
//                if(key == 1){
//                    var x = e.clientX;
//                    var y = e.clientY;
//                    $(".text").html("X: "+x+" Y: "+y);
//                    $(".desk").show().css({left:x,top:y});
//                    if (e.preventDefault) {
//                        e.preventDefault();
//                    } else {
//                        e.returnValue = false;
//                    }
//                    e.stopPropagation();
//                    console.log("ab");
//                  //  return false;
//
//                }
//
//            })
//
//        });
    });


    // create the editor
    // set json
    var json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    };

    var container = document.getElementById("jestree");
     editor_tree = new JSONEditor(container);
     editor_tree.set(json);
     container = document.getElementById("jestext");
     editor_text = new JSONEditor(container,{
                    "mode": "text",
                    "indentation": 2
                });
     editor_text.set(json);

    editor_out_raw=new JSONEditor($("#jestreeoutraw")[0]);
    editor_out_json=new JSONEditor($("#jestreeout")[0]);


    $("#jesace").text(JSON.stringify(json));
    ace_editor = ace.edit("jesace");
    ace_editor.setTheme("ace/theme/twilight");
    ace_editor.getSession().setMode("ace/mode/javascript");
    //editor = new JSONEditor(container,jj);
    //editor.set(json);


    // get json
    var json = editor_tree.get();

}


document.onkeydown = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (e.ctrlKey && (keyCode == 83 )) {
       // $("#f").submit();
        console.log("保存");
        $("#save").trigger("click");
        save();
        e.returnValue = false;
    }
}

$(document).ready( function () {

    init();

})

