$(document).ready(function(){
	$.get("blog/blogAction!getBlog?blog_id="+localStorage.getItem("blog_id"),
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //获取失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //获取成功
			    else{
//			    	alert("content="+json.blogList[0].content);
			    	document.getElementById("content").innerHTML = json.blogList[0].content;
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