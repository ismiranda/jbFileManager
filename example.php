<html>
<head>
<meta http-equiv="content-Type" content="text/html; charset=ISO-8859-1">
<title>Administração - File Manager</title>
<script type="text/javascript" src="jbfm/js/jquery-1.7.1.min.js" type="text/javascript"></script>
<script type="text/javascript" src="jbfm/js/jbfm.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('#teste').click(function(){
			fbfm($('input[name=file]'),'index.php');
		});
});
</script>
</head>
<body>
<h1>jbFileManager</h1>
<input type="text" name="file"><input type="button" value="teste" id="teste">
</body>
</html>
