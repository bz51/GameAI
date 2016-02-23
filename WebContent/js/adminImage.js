document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
	
	//隐藏大图
//	$("#bigPic").hide();
	
	/**
	 * 加载全部图片信息
	 */
	$.get("image/imageAction!getAllImages",
		  
		  function(data,status){
//			alert(data);
		    var json = eval('(' + data + ')');
		    
		    //获取失败
		    if(json.result=="no"){
		    	alert(json.reason);
		    }
		   
		    //获取成功
		    else{
		    	var html = "";
		    	$.each(json.imageList, function(index, val) {
		    		var name = val.name.replaceAll("/","^");
		    		alert(name);
		    		html = html + '<tr><td><a href="#" onclick="clickPic("'+name.replaceAll("/","^")+'")"><img width="100px;" src="'+val.name+'"/></a></td><td>'+val.name+'</td><td>'+val.user_name+'</td><td>'+val.time+'</td><td><button onclick="deletePic('+val.id+')">删除</button></td></tr>';
		    		
		    		$("#imageTable").text("");
		    		$("#imageTable").append(html);
		    		
		    	});
		    }
		    
	});
	
});

		    		//定义replaceAll函数
		    		String.prototype.replaceAll = function(s1,s2){ 
		    			return this.replace(new RegExp(s1,"gm"),s2); 
		    			} 

/**
 * 点击“查看大图”按钮
 */
function clickPic(src){
	alert();
	//显示大图
//	$("#bigPic").show();
//	$("bigPic").attr("src",src);
}

/**
 * 点击大图，关闭大图
 */
function clickBigPic(){
	//隐藏大图
	$("#bigPic").hide();
}


/**
 * 上传图片
 */
function clickUpload(){
$.ajax({
    cache: true,
    type: "POST",
    url: "image/imageAction!uploadImage",
    data:$('#imageForm').serialize(),// 你的formid
    async: false,
    error: function(request) {
        alert("失败");
    },
    success: function(data) {
    	alert("成功");
//        $("#commonLayout_appcreshi").parent().html(data);
    }
});
}


/**
 * 点击“选择图片”按钮
 */
function clickChoosePic(){
	
}


/**
 * 点击“上传”按钮
 */
function clickUploadBtn(){
	if($("#file").val()=="" || $("#file").val()==null){
		alert("尚未选择图片");
	}
	else{
		$("#imageForm").submit();
	}
}


/**
 * 删除图片
 * @param id
 */
function deletePic(id){
//	alert(id);
	$.get("image/imageAction!deletePic?pic_id="+id,
			  
			  function(data,status){
//				alert(data);
			    var json = eval('(' + data + ')');
			    
			    //删除失败
			    if(json.result=="no"){
			    	alert(json.reason);
			    }
			   
			    //删除成功
			    else{
			    	alert("删除成功");
			    	window.location.href="adminImage.html";
			    }
			    
		});
}