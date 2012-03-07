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