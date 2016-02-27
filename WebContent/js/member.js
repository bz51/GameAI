document.write("<script language=javascript src='js/common.js'></script>");
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

