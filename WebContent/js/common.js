
	
	
	
	/**
	 * 点击导航栏
	 * @param index
	 */
	function clickNav(index){
		//点击“科研需求”
		if(index==1){
			localStorage.setItem("type","1");
			window.location.href="adminBlog.html";
		}
		//点击“网协”
		else if(index==2){
			localStorage.setItem("type","2");
			window.location.href="adminBlog.html";
		}
		//点击“读书活动”
		else if(index==3){
			localStorage.setItem("type","3");
			window.location.href="adminBlog.html";
		}
		//点击“新闻”
		else if(index==4){
			localStorage.setItem("type","4");
			window.location.href="adminBlog.html";
		}
		//点击“热门”
		else if(index==5){
			localStorage.setItem("type","5");
			window.location.href="adminBlog.html";
		}
		//点击“项目需求”
		else if(index==6){
			localStorage.setItem("type","6");
			window.location.href="adminBlog.html";
		}
		
	}
	
	
	/**
	 * 查看某一个人的简历
	 */
	function clickResumeDetail(user_id){
		//看自己的简历
		if(user_id==null || user_id==""){
//			alert("查看自己的简历,id="+user_id);
			localStorage.setItem("look_user_id",localStorage.getItem("id"));
			window.location.href="resumeDetail.html?user_id="+localStorage.getItem("id");
		}
		//跳转到首页
		else if(user_id=='index'){
			window.location.href="index1.html";
		}
		//看别人的简历
		else{
			localStorage.setItem("look_user_id",user_id);
			window.location.href="resumeDetail.html?user_id="+user_id;
		}
		
	}
	
	
	/**
	 * 注销登录
	 */
	function logout(){
		localStorage.setItem("id","");
    	localStorage.setItem("username","");
    	localStorage.setItem("name","");
    	localStorage.setItem("role","");
    	
    	alert("注销成功！");
    	
    	window.location.href="admin.html";
	} 
	
	
	
	/**
	 * 发布一篇新的博客
	 */
	function postNewBlog(){
		//清除modify_content标记
		localStorage.setItem("modify_content","");
		//跳转至发布博客页面
		window.location.href="postBlog.html";
	}
	
	
	
	/**
	 * 获取url上参数的值
	 * @param name
	 * @returns
	 */
	function GetQueryString(name)
	{
//		alert(name);
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	
	function postComment(){
		//获取回复的对象
		var re_comment_id = $("#re_comment_id").val();
//		alert("re_comment_id="+re_comment_id);
		if(re_comment_id==null || re_comment_id=="")
			re_comment_id = 0;
		
		//获取blog_id
		var blog_id = GetQueryString("blog_id");
		if(blog_id==null || blog_id==""){
			blog_id = localStorage.getItem("blog_id");
		}
		
		//获取用户名和id
		var name = localStorage.getItem("name");
		var user_id = localStorage.getItem("id");
		if(user_id==null || user_id=="" || name==null || name==""){
			name = "游客";
			user_id = 0;
		}
		
		//获取评论内容
		var re_comment = $("#re_comment").val();
//		alert("re_comment="+re_comment);
		if(re_comment==null || re_comment=="")
			alert("评论内容不能为空！");
		else{
			//发布评论
//			alert("comment/commentAction!postComment?commentEntity.blog_id="+blog_id+"&commentEntity.name="+name+"&commentEntity.user_id="+user_id+"&commentEntity.content="+re_comment+"&commentEntity.comment_id="+re_comment_id);
			$.get("comment/commentAction!postComment?commentEntity.blog_id="+blog_id+"&commentEntity.name="+name+"&commentEntity.user_id="+user_id+"&commentEntity.content="+re_comment+"&commentEntity.comment_id="+re_comment_id,
					  
					  function(data,status){
//						alert(data);
					    var json = eval('(' + data + ')');
					    
					    //获取失败
					    if(json.result=="no"){
					    	alert("json_no="+json.reason);
					    }
					   
					    //获取成功
					    else{
					    	alert("评论成功");
					    	location.reload();
					    }
					    
				});
		}
		
	}
	
	
	
	