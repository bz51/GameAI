$(document).ready(function(){
	$.get("blog/blogAction!getBlog",
			  
			  function(data,status){
				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //获取失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //获取成功
			    else{
			    	var html;
			    	$.each(json.blogList, function(index, val) {
			    		html = html + '<tr><td><a href="#" target="_blank" onclick="clickBlogTitle('+val.id+')">'+val.title+'</a></td><td>'+val.description+'</td><td>'+val.time+'</td></tr>';
			    		$("#blogTable").text("");
			    		$("#blogTable").append(html);
			    		
			    	});
			    }
			    
		});
});

function clickBlogTitle(id){
	alert(id);
	//将blog_id存入本地
	localStorage.setItem("blog_id",id);
	//跳转至博客详情页
	window.location.href="blogDetail.html";
}