document.write("<script language=javascript src='js/common.js'></script>");
$(document).ready(function(){
	
//	if(localStorage.getItem("role")==null){
//		alert("请登录");
//		window.location.href="admin.html";
//	}
	
});


function clickBtn(url){
	if(url=="resumeDetail.html"){
		url = url + "?id="+localStorage.getItem("id");
	}
	window.location.href=url;
}