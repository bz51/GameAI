$(document).ready(function(){
	$('#homes').click(function(){
		$("html,body").animate({scrollTop: $("#home").offset().top}, 1000);
	});
	$('#projects').click(function(){
		$("html,body").animate({scrollTop: $("#project").offset().top}, 1000);
	});
	$('#members').click(function(){
		$("html,body").animate({scrollTop: $("#member").offset().top}, 1000);
	});
	$('#contacts').click(function(){
		$("html,body").animate({scrollTop: $("#contact").offset().top}, 1000);
	});
	$('#publications').click(function(){
		$("html,body").animate({scrollTop: $("#publication").offset().top}, 1000);
	});
});