$(document).ready(function(){
	
	
});

/**
 * 点击发布按钮
 */
function clickFabu(){
	//定义replaceAll函数
	String.prototype.replaceAll = function(s1,s2){ 
		return this.replace(new RegExp(s1,"gm"),s2); 
		} 
	
	if($("#title").val()==null || $("#title").val()=="")
		alert("标题不能为空！");
	else{
		var content = CKEDITOR.instances.editor1.getData();
		content = content.replaceAll("\n", "<br/>").replace("#", "~~~");
		alert(content);
		alert("blog/blogAction!postBlog?description="+CKEDITOR.instances.editor1.document.getBody().getText().substr(0, 15)+"&title="+$("#title").val()+"&content="+content);
//		$.get("blog/blogAction!postBlog?description="+CKEDITOR.instances.editor1.document.getBody().getText().substr(0, 15)+"&title="+$("#title").val()+"&content="+content,
		$.post("blog/blogAction!postBlog",{description:CKEDITOR.instances.editor1.document.getBody().getText().substr(0, 15),title:$('#title').val(),content:content},
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //获取失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //获取成功
			    else{
			    	alert("发布成功！");
			    	window.location.href="adminBlog.html";
			    }
			    
		});
	}
}


$(function(){
    $('pre code').each(function(){
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('pre-numbering');
        $(this)
            .addClass('has-numbering')
            .parent()
            .append($numbering);
        for(i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
});