document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
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
			    	var html1="",html2="",html3="",html4="",html5="";
			    	//未登录
			    	if(localStorage.getItem("role")==null || localStorage.getItem("role")==""){
			    		$.each(json.blogList, function(index, val) {
			    			if(val.state==0){
			    				if(val.type==1)
			    					html1 = html1 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==2)
			    					html2 = html2 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==3)
			    					html3 = html3 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==4)
			    					html4 = html4 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==5)
			    					html5 = html5 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==6)
			    					html6 = html6 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				$("#list1").text("");
			    				$("#list2").text("");
			    				$("#list3").text("");
			    				$("#list4").text("");
			    				$("#list5").text("");
			    				$("#list6").text("");
			    				$("#list1").append(html2);
			    				$("#list2").append(html1);
			    				$("#list3").append(html3);
			    				$("#list4").append(html4);
			    				$("#list5").append(html5);
			    				$("#list6").append(html6);
			    			}
			    		});
			    	}
			    	//已登录
			    	else{
			    		$.each(json.blogList, function(index, val) {
			    			if((val.state!=2) || (val.state==2 && localStorage.getItem("id")==val.user_id)){
			    				if(val.type==1)
			    					html1 = html1 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==2)
			    					html2 = html2 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==3)
			    					html3 = html3 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==4)
			    					html4 = html4 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==5)
			    					html5 = html5 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				else if(val.type==6)
			    					html6 = html6 + '<li><a href="#" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></li>';
			    				$("#list1").text("");
			    				$("#list2").text("");
			    				$("#list3").text("");
			    				$("#list4").text("");
			    				$("#list5").text("");
			    				$("#list6").text("");
			    				$("#list2").append(html1);
			    				$("#list1").append(html2);
			    				$("#list3").append(html3);
			    				$("#list4").append(html4);
			    				$("#list5").append(html5);
			    				$("#list6").append(html6);
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