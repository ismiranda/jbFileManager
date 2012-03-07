/*
 *  jbFileManager
    Copyright (C) 2012  Igor da Silva Miranda

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */
var root_folder = '';
var current_id_folder = '';

function init(){
	$.get('jbfm.php?act=root',function(data){
		root_folder = data;
		
		$('#listFolders').append("<ul><li id='_root' class='item'><a href='' class='folder_link close'>"+root_folder+"</a></li></ul>");
		
		listFolder('_root');
		
		selectItem($('#_root a'),'a.folder_link');
	});
}

function listFolder(_id,_path){
	var path = _path == null ? "" : _path;
	var id = _id;
	
	showWait(true);
	
	$.get('jbfm.php?act=list&path='+path,	function(data){
		$('#'+id+' ul').remove();
		$('#'+id).append("<ul></ul>");
		$.each(data,function(i, it){
			if (it.subfolder){
				$('#'+id+' ul').append("<li id='"+id+"_"+i+"' class='item'><span href='"+it.link+"' class='icon plus'></span><a href='"+it.link+"' class='folder_link close'>"+it.name+"</a></li>");
			}else
				$('#'+id+' ul').append("<li id='"+id+"_"+i+"' class='item no_sub'><a href='"+it.link+"' class='folder_link close'>"+it.name+"</a></li>");
			
			$('#'+id+"_"+i+" span.icon").click(function (e){ clickIconFolder(e,$(this)); });
			
			$('#'+id+"_"+i+" a.folder_link").click(function(e){ openFolder(e,$(this)); });
		});
		
		$('#'+id+' ul').slideDown('fast').show();
		
		showWait(false);
		
	},'json');
}

function clickIconFolder(e,el){
	e.preventDefault();
	
	selectItem(el,'a.folder_link');
	
	if (el.hasClass('plus')){
		el.addClass('minus');
		el.parent().find('.folder_link').addClass('open');
		el.removeClass('plus');
		el.parent().find('.folder_link').removeClass('close');
		listFolder(el.parent().attr('id'),el.attr('href'));
	}else{
		el.addClass('plus');
		el.parent().find('.folder_link').addClass('close');
		el.removeClass('minus');
		el.parent().find('.folder_link').removeClass('open');
		el.parent().find('ul').slideUp('fast',function (){$(this).remove()});
	}
}


function openFolder(e,el){
	if (e != null)
		e.preventDefault();
	
	selectItem(el,'a.folder_link');
	
	current_id_folder = el.parent().attr('id');
	
	showWait(true);
	
	$.get('jbfm.php?act=open&path='+el.attr('href'),	function(data){
		$('#listFiles').html('<ul></ul>');
		$.each(data,function(i, it){
			$('#listFiles ul').append("<li id='_file"+i+"' class='file_icon'><a href='"+it.link+"' class='"+it.class+"'>"+it.name+"</a></li>");
			$('#_file'+i+' a').click(function (e){ clickFile(e,$(this)); });
			$('#_file'+i+' a').dblclick(function (e){ dblClickFile(e,$(this)); });
		});
		$('#listFiles ul').slideDown('fast').show();
		showWait(false);
	},"json");	
}

function clickFile(e,el){
	e.preventDefault();
	
	selectItem(el.parent(),'li.file_icon');
	
	current_id_file = el.parent().attr('id');
}

function dblClickFile(e,el){
	e.preventDefault();
	
	file = $('#'+el.parent().attr('id')+' a').attr('href');
	
	opener.setCurrentInput(file);
	
	window.close();
}

function showWait(show,msg){
	msg = msg != null ? msg : 'loading...';
	if (show){
		$('#frame').append("<div id='wait'><span>"+msg+"</span></div>");
		
		var w = $(window).width();
		var h = $(window).height();
		
		$('#layer').width(w);
		$('#layer').height(h);
		$('#layer').css('opacity','0.2');
		
	}else{
		$('#layer').remove();
		$('#wait').remove();
	}
}

function showUploadDialog(show){
	if ($('#frm_upl').length > 0){
		$('#frm_upl').remove();
	}
	
	path = $('#'+current_id_folder+' a.folder_link').attr('href');
	$('#listFiles').append("<form id='frm_upl' method='POST' action='jbfm.php?act=upload&path="+path+"' enctype='multipart/form-data' target='upd' style='display:none'><input type='file' name='file'></form>");
	
	$('#frm_upl input').click();
	
	$('#frm_upl input').change(function(){
		$('#listFiles').append("<iframe name='upd'></iframe>");
		$('#frm_upl').submit();
		showWait(true,'uploading...')
	});
}

function showResult(code,msg){
	if (code != 1)
		alert(msg);
	else
		openFolder(null,$('#'+current_id_folder+' a.folder_link'));
	
	showWait(false);
}

function showNewFolderDialog(){
	if ($('#new-folder').length == 0){
		$('#listFolders').append("<div id='new-folder'><form method='POST'><input type='text'> <img src='images/ok.png'></form></div>");
		$('#new-folder').slideDown('slow').show();
		
		$('#new-folder form img').click(function(e){
			if ($('#new-folder form input').val() != ''){
				if (current_id_folder == 'listFolders')
					path = '';
				else
					path = $('#'+current_id_folder+' a.folder_link').attr('href');
				
				$.get('jbfm.php?act=create&path='+path+'&folder='+$('#new-folder form input').val(),
					function (data){
						$('#new-folder').slideUp('slow',function (){$(this).remove();});
						listFolder(current_id_folder,path);
						addIconFolder(current_id_folder,path);
				});
			}
		});
		
	}else{
		$('#new-folder').slideUp('slow',function (){$(this).remove();});
	}
}

function rmFolder(){
	if (current_id_folder != 'listFolders'){
		path = $('#'+current_id_folder+' a.folder_link').attr('href');
		$.get('jbfm.php?act=rm&path='+path,
				function (data){
					tmp = $('#'+current_id_folder).parent().parent().parent().parent();
					$('#'+current_id_folder).parent().remove();
					if(tmp.get(0).tagName == 'DIV')
						listFolder(tmp.attr('id'));
					else
						listFolder(tmp.attr('id'),tmp.find('a.folder_link'));
			});
	}
}

function delFile(){
	if (current_id_file != ''){
		file = $('#'+current_id_file+' a').attr('href');
		$.get('jbfm.php?act=del&file='+file,
				function (data){
					$('#'+current_id_file).remove();
			});
	}
}

function selectItem(el,sel){
	$(sel).removeClass('active');
	el.addClass('active');
}

function addIconFolder(id,path){
	if ($('#'+id+' span').length == 0)
		$('#'+id).prepend("<span href='"+path+"' class='icon minus'></span>")
	else{
		$('#'+id+' span').removeClass('plus');
		$('#'+id+' span').addClass('minus');
	}
}

function getCurrentPath(){
	if (current_id_folder == '_root')
		path = '';
	else
		path = $('#'+current_id_folder+' a.folder_link').attr('href');
}