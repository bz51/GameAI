$(document).ready(function(){
	
	//隐藏大图
	$("#bigPic").hide();
	
	/**
	 * 加载全部图片信息
	 */
	$.get("image/imageAction!getAllImages",
		  
		  function(data,status){
			alert(data);
		    var json = eval('(' + data + ')');
		    
		    //获取失败
		    if(json.result=="no"){
		    	alert(json.reason);
		    }
		   
		    //获取成功
		    else{
		    	var html = "";
		    	$.each(json.imageList, function(index, val) {
		    		html = html + '<tr><td><a href="#" onclick="clickPic('+val.name+')"><img width="200px;" src='+val.name+'/></a></td><td>'+val.name+'</td><td>'+val.user_name+'</td><td>'+val.time+'</td></tr>';
		    		$("#imageTable").text("");
		    		$("#imageTable").append(html);
		    		
		    	});
		    }
		    
	});
	
});


/**
 * 点击“查看大图”按钮
 */
function clickPic(src){
	//显示大图
	$("#bigPic").show();
	$("bigPic").attr("src",src);
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