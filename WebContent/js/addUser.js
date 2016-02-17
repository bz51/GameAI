$(document).ready(function(){
	
	//修改用户信息
	if(localStorage.getItem("fromWhere")=="modifyUser"){
		localStorage.setItem("fromWhere","");
		//隐藏“新增”按钮，显示“修改”按钮
		$("#add").hide();
		$("#modify").show();
		
		//获取id，并显示在界面上
		//发送请求
		$.get("user/userAction!getUserInfoById?user_id="+localStorage.getItem("user_id"),
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //查询失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //查询成功
			    else{
			    	$("#username").val(json.userEntity.username);
			    	$("#password").val(json.userEntity.password);
			    	$("#name").val(json.userEntity.name);
			    	$("#age").val(json.userEntity.age);
			    	$("#mail").val(json.userEntity.mail);
			    	$("#phone").val(json.userEntity.phone);
			    	$("#resume").val(json.userEntity.resume);
			    	$("#role").val(json.userEntity.role);
			    }
			    
		});
	}
	//新增用户
	else{
		//隐藏“修改”按钮，显示“新增”按钮
		$("#modify").hide();
		$("#add").show();
	}
	
	/**
	 * 点击新增按钮
	 */
	$("#add").click(function(){
	    //判断是否为空
	    if($("#username").val()==null || $("#username").val()==null || $("#password").val()=='' || $("#password").val()==''){
			alert("用户名、密码不能为空");
		}
	    
	    else{
	    	//发送请求
	    	$.get("user/userAction!addUser?userEntity.password="+$("#password").val()+"&userEntity.username="+$("#username").val()+"&userEntity.age="+$("#age").val()+"&userEntity.mail="+$("#mail").val()+"&userEntity.phone="+$("#phone").val()+"&userEntity.resume="+$("#resume").val()+"&userEntity.role="+$("#role").val()+"&userEntity.name="+$("#name").val(),
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //新增失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //新增成功
			    else{
			    	alert("添加成功！");
			    	window.location.href="adminUser.html";
			    }
			    
	    	});
	    }
	});
	
	/**
	 * 点击“确认修改”按钮
	 */
	$("#modify").click(function(){
//		alert();
		//判断是否为空
		if($("#username").val()==null || $("#username").val()==null || $("#password").val()=='' || $("#password").val()==''){
			alert("用户名、密码不能为空");
		}
		
		else{
			//发送请求
//			alert("user/userAction!modifyUser?userEntity.id="+localStorage.getItem("user_id")+"&userEntity.password="+$("#password").val()+"&userEntity.username="+$("#username").val()+"&userEntity.age="+$("#age").val()+"&userEntity.mail="+$("#mail").val()+"&userEntity.phone="+$("#phone").val()+"&userEntity.resume="+$("#resume").val()+"&userEntity.role="+$("#role").val()+"&userEntity.name="+$("#name").val());
			$.get("user/userAction!modifyUser?userEntity.id="+localStorage.getItem("user_id")+"&userEntity.password="+$("#password").val()+"&userEntity.username="+$("#username").val()+"&userEntity.age="+$("#age").val()+"&userEntity.mail="+$("#mail").val()+"&userEntity.phone="+$("#phone").val()+"&userEntity.resume="+$("#resume").val()+"&userEntity.role="+$("#role").val()+"&userEntity.name="+$("#name").val(),
					
				function(data,status){
//				alert(data);
				var json = eval('(' + data + ')');
				
				//新增失败
				if(json.result=="no"){
					alert(json.reason);
				}
				
				//新增成功
				else{
					alert("修改成功！");
					window.location.href="adminUser.html";
				}
				
			});
		}
	});
	
});