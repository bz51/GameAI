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
});
