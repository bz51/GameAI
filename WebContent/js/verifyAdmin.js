//判断是否是超级管理员
	if(localStorage.getItem("role")==null || localStorage.getItem("role")==""){
		alert("请登录");
		window.location.href="admin.html";
	}