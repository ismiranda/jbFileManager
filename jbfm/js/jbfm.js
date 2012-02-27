var current_input;

function fbfm(obj){
	current_input = obj;
	
	script_path = getPath();
	
	window.open(script_path+'index.php','sbfm','width=530,height=350');
}

function setCurrentInput(value){
	current_input.val(value); 
}

function getPath(){
	var script_path = '';
	var scripts = $('script');
	$.each(scripts,function (i,it){
		src = $(it).attr('src');
		if ((src != null) && (src.indexOf('jbfm.js') > 0))
			script_path = src.substring(0,src.lastIndexOf('js/'));
	});
	
	return script_path;
}