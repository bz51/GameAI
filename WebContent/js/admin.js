$(document).ready(function(){
	
	/**
	 * 点击登录按钮
	 */
	$("#login").click(function(){
	    //判断是否为空
	    if($("#username").val()==null || $("#username").val()==null || $("#password").val()=='' || $("#password").val()==''){
			alert("用户名、密码不能为空");
		}
	    
		//发送请求
		$.get("user/userAction!login?password="+$("#password").val()+"&username="+$("#username").val(),
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //登录失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //登录成功
			    else{
			    	localStorage.setItem("id",json.userEntity.id);
			    	localStorage.setItem("username",json.userEntity.username);
			    	localStorage.setItem("name",json.userEntity.name);
			    	localStorage.setItem("role",json.userEntity.role);
			    	
			    	window.location.href="adminIndex.html";
			    	
			    }
			    
		});
	});
	
});