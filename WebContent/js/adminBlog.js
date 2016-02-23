document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
	//设置当前页标题
	var topTitle;
	if(localStorage.getItem("type")=="1"){
		topTitle = "科研需求";
	}else if(localStorage.getItem("type")=="2"){
		topTitle = "网协";
	}else if(localStorage.getItem("type")=="3"){
		topTitle = "读书活动";
	}else if(localStorage.getItem("type")=="4"){
		topTitle = "新闻";
	}else if(localStorage.getItem("type")=="5"){
		topTitle = "热门";
	}
	$("#topTitle").text(topTitle);
	$.get("blog/blogAction!getBlog",
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //获取失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //获取成功
			    else{
			    	var html;
			    	//未登录
			    	if(localStorage.getItem("role")==null || localStorage.getItem("role")==""){
			    		$.each(json.blogList, function(index, val) {
			    			if(localStorage.getItem("type")==val.type && val.state==0){
			    				html = html + '<a href="#" onclick="clickBlogTitle('+val.id+')"><div class="jumbotron"><table width="100%"><tr><td width="90%"><h3 style="text-align:left;margin-top:-20px;">'+val.title+'</h3></td></tr><tr><td><p style="text-align:left;font-size:16px;">'+val.description+'</p></td></tr><tr><td><p style="text-align:left;margin-bottom:-20px;font-size:14px;color:#949494;">'+val.time+'&nbsp;&nbsp;&nbsp;&nbsp;'+val.name+'</p></td></tr></table></div></a>';
			    				$("#blogList").text("");
			    				$("#blogList").append(html);
			    			}
			    		});
			    	}
			    	//已登录
			    	else{
			    		$.each(json.blogList, function(index, val) {
//			    			alert(localStorage.getItem("type")+","+val.type);
//			    			alert((localStorage.getItem("type")==val.type && val.state!=2) || (localStorage.getItem("type")==val.type && val.state==2 && localStorage.getItem("id")==val.user_id));
			    			if((localStorage.getItem("type")==val.type && val.state!=2) || (localStorage.getItem("type")==val.type && val.state==2 && localStorage.getItem("id")==val.user_id)){
			    				html = html + '<div class="jumbotron"><table><tr><td width="90%"><a href="#" onclick="clickBlogTitle('+val.id+')"><h3 style="text-align:left;margin-top:-20px;">'+val.title+'</h3></a></td><td><button type="button" class="btn btn-info" onclick="clickDelete('+val.id+')">删除</button></td></tr><tr><td><p style="text-align:left;font-size:16px;">'+val.description+'</p></td></tr><tr><td><p style="text-align:left;margin-bottom:-20px;font-size:14px;color:#949494;">'+val.time+'&nbsp;&nbsp;&nbsp;&nbsp;'+val.name+'</p></td></tr></table></div>';
			    				$("#blogList").text("");
			    				$("#blogList").append(html);
			    			}
			    		});
			    	}
			    }
			    
		});
});

function clickBlogTitle(id){
//	alert("clickBlogTitle,id="+id+",fromWhere="+localStorage.getItem("fromWhere"));
	//将blog_id存入本地
	localStorage.setItem("blog_id",id);
	//跳转至博客详情页
	window.location.href="blogDetail.html";
}

function clickDelete(id){
//	alert("clickDelete,id="+id);
	$.get("blog/blogAction!deleteBlog?blog_id="+id,
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //删除失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //删除成功
			    else{
			    	alert("删除成功");
			    	//刷新博客列表页
			    	window.location.href="adminBlog.html";
			    }
			    
		});
}