$(document).ready(function(){
	
	//判断是否是超级管理员
	if(localStorage.getItem("role")!=0){
		alert("您没有权限访问本页面！");
		window.location.href="admin.html";
	}
	
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
		    	var html;
//		    	var html = "<tr><th>用户名</th><th>姓名</th><th>年龄</th><th>邮箱</th><th>简历地址</th><th>角色</th><th>操作</th></tr>";
		    	$.each(json.userList, function(index, val) {
		    		var role = "普通管理员";
		    		if(val.role==0)
		    			role = "超级管理员";
		    		
		    		html = html + '<tr><td>'+val.username+'</td><td>'+val.name+'</td><td>'+val.age+'</td><td>'+val.mail+'</td><td>'+val.resume+'</td><td>'+role+'</td><td><input type="button" onclick="clickModify('+val.id+')" value="修改" /><input type="button" onclick="clickDelete('+val.id+')" value="删除" /></tr>';
		    		$("#userTable").text("");
		    		$("#userTable").append(html);
		    		
		    	});
		    }
		    
	});
	
});

/**
 * 点击“修改”按钮
 * @param id
 */
function clickModify(id){
	if(id=="" || id==null){
		alert("id为空！");
	}
	else{
		localStorage.setItem("fromWhere","modifyUser");
		localStorage.setItem("user_id",id);
		window.location.href="addUser.html";
	}
}

/**
 * 点击“删除”按钮
 * @param id
 */
function clickDelete(id){
	if(id=="" || id==null){
		alert("id为空！");
	}
	else{
		//发送请求
//		alert("user/userAction!deleteUser?user_id="+id);
		$.get("user/userAction!deleteUser?user_id="+id,
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //查询失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //查询成功
			    else{
			    	window.location.href="adminUser.html";
			    }
		});
	}
}