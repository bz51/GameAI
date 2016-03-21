document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
	
//	alert("post blog_id="+localStorage.getItem("modify_blog_id"));
	if(localStorage.getItem("modify_blog_id")!=null && localStorage.getItem("modify_blog_id")!=""){
		//获取该博客的title和content
		$("#waitBox").html("<h2>正在加载中……</h2>");
		setTimeout(function () {
			$.get("blog/blogAction!getBlog?blog_id="+localStorage.getItem("modify_blog_id"),
					  
					  function(data,status){
//						alert(data);
					    var json = eval('(' + data + ')');
					    
					    //获取失败
					    if(json.result=="no"){
					    	alert(json.reason);
					    }
					   
					    //获取成功
					    else{
					    	$.each(json.blogList, function(index, val) {
					    		title = val.title;
						    	content = val.content;
						    	localStorage.setItem("modify_content",val.content);
						    	localStorage.setItem("modify_title",val.title);
					    	});
					    	
//					    	alert(localStorage.getItem("modify_content"));
					    	//若从修改简历跳转过来，则将带修改内容显示在textarea中
					    	if(localStorage.getItem("modify_content")!=null && localStorage.getItem("modify_content")!=""){
					    		CKEDITOR.instances.editor1.setData(localStorage.getItem("modify_content"));//赋值
//					    		localStorage.setItem("modify_blog_id","");
//					    		localStorage.setItem("modify_content","");
					    		//赋上标题
//					    		alert(localStorage.getItem("modify_title"));
					    		if(localStorage.getItem("modify_title")!=null && localStorage.getItem("modify_title")!=""){
					    			$("#title").val(localStorage.getItem("modify_title"));
					    			localStorage.setItem("modify_title","");
					    		}
					    		else
					    			$("#title").val(localStorage.getItem("name")+"的个人简历");
					    		//隐藏类型选项
					    		$("#type").hide();
					    		$("#typeText").hide();
					    		//隐藏权限选项
					    		$("#state").hide();
					    		$("#stateText").hide();
					    	}
					    	$("#waitBox").hide();
					    }
				});
	    }, 3000);
	}
	
	else{
		$("#waitBox").hide();
//		alert();
		//若从修改简历跳转过来，则将带修改内容显示在textarea中
    	if(localStorage.getItem("modify_content")!=null && localStorage.getItem("modify_content")!=""){
    		CKEDITOR.instances.editor1.setData(localStorage.getItem("modify_content"));//赋值
//    		localStorage.setItem("modify_blog_id","");
//    		localStorage.setItem("modify_content","");
    		//赋上标题
//    		alert(localStorage.getItem("modify_title"));
    		if(localStorage.getItem("modify_title")!=null && localStorage.getItem("modify_title")!=""){
    			$("#title").val(localStorage.getItem("modify_title"));
    			localStorage.setItem("modify_title","");
    		}
    		else
    			$("#title").val(localStorage.getItem("name")+"的个人简历");
    		//隐藏类型选项
    		$("#type").hide();
    		$("#typeText").hide();
    		//隐藏权限选项
    		$("#state").hide();
    		$("#stateText").hide();
    	}
	}
//	//若从修改简历跳转过来，则将带修改内容显示在textarea中
//	if(localStorage.getItem("modify_content")!=null && localStorage.getItem("modify_content")!=""){
//		CKEDITOR.instances.editor1.setData(localStorage.getItem("modify_content"));//赋值
//		//赋上标题
////		alert(localStorage.getItem("modify_title"));
//		if(localStorage.getItem("modify_title")!=null && localStorage.getItem("modify_title")!=""){
//			$("#title").val(localStorage.getItem("modify_title"));
//			localStorage.setItem("modify_title","")
//		}
//		else
//			$("#title").val(localStorage.getItem("name")+"的个人简历");
//		//隐藏类型选项
//		$("#type").hide();
//		$("#typeText").hide();
//		//隐藏权限选项
//		$("#state").hide();
//		$("#stateText").hide();
//	}
	
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
//		content = content.replace("#", "~~~");
		content = content.replaceAll("\n", "").replace("#", "~~~");
//		alert("type="+$("#type").val()+",state="+$("#state").val()+"modify_content＝"+localStorage.getItem("modify_content"));
		//修改简历、博客
		if(localStorage.getItem("modify_content")!=null && localStorage.getItem("modify_content")!=""){
//			alert("修改简历");
			$.post("blog/blogAction!modifyBlog",{content:content,user_id:localStorage.getItem("id"),user_name:localStorage.getItem("name"),blog_id:localStorage.getItem("modify_blog_id")},
					  
					  function(data,status){
//						alert(data);
					    var json = eval('(' + data + ')');
					    
					    //获取失败
					    if(json.result=="no"){
					    	alert(json.reason);
					    }
					   
					    //获取成功
					    else{
					    	localStorage.setItem("modify_content","");
					    	localStorage.setItem("modify_blog_id","");
					    	alert("发布成功！");
//					    	alert(localStorage.getItem("modify_blog_id"));
					    	window.location.href="adminBlog.html";
					    }
					    
				});
		}
		//正常发布博客
		else{
//			alert(content);
			$.post("blog/blogAction!postBlog",{description:CKEDITOR.instances.editor1.document.getBody().getText().substr(0, 15),title:$('#title').val(),content:content,type:$("#type").val(),state:$("#state").val(),user_id:localStorage.getItem("id")},
					  
					  function(data,status){
//						alert(data);
						$("#xxx").text(data);
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