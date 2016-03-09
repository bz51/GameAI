document.write("<script language=javascript src='js/common.js'></script>");

$(document).ready(function(){
	//隐藏“修改简历”按钮
	$("#modifyResumeBtn").show();
	//获取url后面的id
	var id = GetQueryString("id");
	var url = "";
	if(id!=null && id!=""){
//		alert("blog/blogAction!getResume?user_id="+localStorage.getItem("look_user_id"));
		url = "blog/blogAction!getResume?user_id="+id;
		//判断是否需要显示“修改简历”按钮
		if(id==localStorage.getItem("id")){
			$("#modifyResumeBtn").show();
		}
	}else if(localStorage.getItem("look_user_id")!=null && localStorage.getItem("look_user_id")!=""){
//		alert("blog/blogAction!getResume?user_id="+localStorage.getItem("look_user_id"));
		url = "blog/blogAction!getResume?user_id="+localStorage.getItem("look_user_id");
	}
	else{
		url = "blog/blogAction!getResume?user_id=5";
	}
	
	//发送请求
	$.get(url,
		  
		  function(data,status){
//			alert(data);
		    var json = eval('(' + data + ')');
		    
		    //查询失败
		    if(json.result=="no"){
		    	alert(json.reason);
		    }
		   
		    //查询成功
		    else{
//		    	alert("content="+json.blogList[0].content);
		    	document.getElementById("content2").innerHTML = json.blogEntity.content;
		    	document.getElementById("titile").innerHTML = json.blogEntity.title;
		    	document.getElementById("name").innerHTML = json.blogEntity.name;
		    	document.getElementById("time").innerHTML = json.blogEntity.time;
		    	$('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                  });
		    	
		    	localStorage.setItem("look_user_id","");
		    }
		    
	});
	
	
	$('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	  });
});



/**
 * 获取url上参数的值
 * @param name
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


/**
 * 点击“修改简历”
 */
function modifyResume(){
	localStorage.setItem("modify_content",$("#content2").html()+".");
//	alert($("#content").html());
	window.location.href="postBlog.html";
}