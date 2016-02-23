$(document).ready(function(){
	//发送请求
	$.get("user/userAction!getAllUsers",
		  
		  function(data,status){
//			alert(data);
		    var json = eval('(' + data + ')');
		    
		    //查询失败
		    if(json.result=="no"){
		    	alert(json.reason);
		    }
		   
		    //查询成功
		    else{
		    	//设置研究生内容
		    	var html = "";
		    	$.each(json.userList, function(index, val) {
		    		if(val.role==1){
		    			html = html + '<li><a href="#" onclick="clickResumeDetail('+val.id+')">'+val.name+'</a></li>';
			    		$("#graduList").text("");
			    		$("#graduList").append(html);
		    		}
		    	});
		    	
		    	//设置本科生内容
		    	var html = "";
		    	$.each(json.userList, function(index, val) {
		    		if(val.role==2){
		    			html = html + '<li><a href="#" onclick="clickResumeDetail('+val.id+')">'+val.name+'</a></li>';
		    			$("#stuList").text("");
		    			$("#stuList").append(html);
		    		}
		    	});
		    }
		    
	});
});

/**
 * 查看某一个人的简历
 */
function clickResumeDetail(user_id){
	alert("1:"+user_id);
	localStorage.setItem("look_user_id",user_id);
	window.location.href="resumeDetail.html";
}