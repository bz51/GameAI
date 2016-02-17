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
			    	var html;
			    	$.each(json.blogList, function(index, val) {
			    		html = html + '<a href="#" target="_blank" onclick="clickBlogTitle('+val.id+')"><div class="jumbotron" style="margin-top: -20px;"><table><tr><td><h3 style="text-align:left;margin-top:-20px;">'+val.title+'</h3></td></tr><tr><td><p style="text-align:left;font-size:16px;">'+val.description+'</p></td></tr><tr><td><p style="text-align:left;margin-bottom:-20px;font-size:14px;color:#949494;">'+val.time+'&nbsp;&nbsp;&nbsp;&nbsp;'+val.name+'</p></td></tr></table></div></a>';
			    		$("#blogList").text("");
			    		$("#blogList").append(html);
			    		
			    	});
			    }
			    
		});
});


function clickBlogTitle(id){
//	alert(id);
	//将blog_id存入本地
	localStorage.setItem("blog_id",id);
	//跳转至博客详情页
	window.location.href="blogDetail.html";
}