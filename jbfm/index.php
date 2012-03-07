<!-- 
 	jbFileManager
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
-->
<html>
<head>
<meta http-equiv="content-Type" content="text/html; charset=ISO-8859-1">
<title>Administração - File Manager</title>
<link rel="stylesheet" type="text/css" href="style.css" />
<script type="text/javascript" src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	current_id_folder = 'listFolders';
	init();
});
</script>

</head>
<body>
	<div id="frame">
		<div id="toolBar">
			<ul class="left">
				<!-- <li><a href="#" onclick="grantPermission();" class="buttonFile" title="Permissão"><img src="images/permission.gif" border="0"></a></li> -->
				<li><a href="javascript:void(0)" onclick="showNewFolderDialog()" class="buttonFile last" title="Nova Pasta"><img src="images/add.png" border="0"></a></li>
				<li><a href="javascript:void(0)" onclick="rmFolder()"	class="buttonFile" title="Excluir"><img src="images/del.png" border="0"></a></li>
			</ul>
			<ul class="right">
				<!-- <li><a href="#" onclick="grantPermission();" class="buttonFile" title="Permissão"><img src="images/permission.gif" border="0"></a></li> -->
				<li><a href="javascript:void(0)" onclick="showUploadDialog(true)"	class="buttonFile" title="Novo Arquivo"><img src="images/upload.png" border="0"></a></li>
				<li><a href="javascript:void(0)" onclick="delFile()" class="buttonFile last"><img src="images/del.png" border="0"></a></li>
			</ul>
		</div>
	
		<div id="listFolders"></div>
		<div id="listFiles"></div>
	</div>
	<div id="previewFiles"></div>
	<div id="buttonlist"></div>
</body>
</html>
