document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
//	alert(GetQueryString("blog_id"));
		var blod_id = GetQueryString("blog_id");
		if(blod_id==null || blod_id==""){
			blod_id = localStorage.getItem("blog_id");
		}
		$.get("blog/blogAction!getBlog?blog_id="+blod_id,
				  
				  function(data,status){
//					alert(data);
				    var json = eval('(' + data + ')');
				    
				    //获取失败
				    if(json.result=="no"){
				    	alert("json_no="+json.reason);
				    }
				   
				    //获取成功
				    else{
//				    	alert("content="+json.blogList[0].content);
				    	document.getElementById("content2").innerHTML = json.blogList[0].content;
				    	document.getElementById("titile").innerHTML = json.blogList[0].title;
				    	document.getElementById("name").innerHTML = json.blogList[0].name;
				    	document.getElementById("time").innerHTML = json.blogList[0].time;
				    	$('pre code').each(function(i, block) {
	                        hljs.highlightBlock(block);
	                      });
				    }
				    
			});
	
	
	$('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	  });
	
	
	
	//获取评论
	$.get("comment/commentAction!getCommentsByBlogId?blog_id="+blod_id,
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //获取失败
			    if(json.result=="no"){
			    	alert("json_no="+json.reason);
			    }
			   
			    //获取成功
			    else{
			    	var html = "";
			    	$.each(json.commentList, function(index, val) {
			    		var name = val.name;
			    		if(val.comment_name!="" && val.comment_name!=null)
			    			name = val.name +" 回复 "+val.comment_name;
			    		html = html + '<div class="well" style="margin-top: 20px;width:899px;" id="comment"><div style="width:100%;height:30px;background-color:#F2F2F2;"><span style="margin-left:10px;line-height:30px;">'+(index+1)+'楼：'+name+' ｜ '+val.time+'</span><a href="#" onclick="clickRepeat('+val.id+')">回复</a></div><div style="margin-left:10px;line-height:30px;">'+val.content+'</div></div>';
			    		$("#comment").text("");
			    		$("#comment").append(html);
		    		});
			    }
			    
		});
});


/**
 * 发布评论
 */
//function postComment(){
////	alert();
////	//获取回复的对象
////	alert($("#re_comment_id").val());
////	alert($("#re_comment_name").val());
////	
////	//获取blog_id
////	var blod_id = GetQueryString("blog_id");
////	if(blod_id==null || blod_id==""){
////		blod_id = localStorage.getItem("blog_id");
////	}
////	
////	//获取用户名和id
////	var name = localStorage.getItem("name");
////	var user_id = localStorage.getItem("id");
////	if(user_id==null || user_id==""){
////		name = "游客";
////		user_id = 0;
////	}
////	
////	//获取评论内容
////	var re_comment = $("#re_comment").val();
////	if(re_comment==null)
////		alert("评论内容不能为空！");
////	else{
////		//发布评论
////		$.get("comment/commentAction!postComment?commentEntity.blog_id="+blod_id+"&commentEntity.name="+name+"&commentEntity.user_id="+user_id+"&commentEntity.content="+re_comment,
////				  
////				  function(data,status){
////					alert(data);
////				    var json = eval('(' + data + ')');
////				    
////				    //获取失败
////				    if(json.result=="no"){
////				    	alert("json_no="+json.reason);
////				    }
////				   
////				    //获取成功
////				    else{
////				    	alert("评论成功");
////				    	history.go(0);
////				    }
////				    
////			});
////	}
//	
//}

function clickRepeat(comment_id){
//	alert(comment_id);
	//定位到输入框
//	window.location.href = "#re";
	$("#re_comment_id").val(comment_id);
	$("body,html").animate({scrollTop:$("#re").offset().top});
//	postComment();
}


