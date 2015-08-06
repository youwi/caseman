



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
$("#save").click(function () {
    var filename = $('#WikiContent').data("file");

    $.post('/wikiSave', {

        filename: filename,
        wikiContent: $("#WikiContent")[0].innerHTML
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
    });
}


document.onkeydown = function (event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    if (e.ctrlKey && (keyCode == 83 )) {
        $("#f").submit();
        e.returnValue = false;
    }
}

$(document).ready( function () {

    init();

})

