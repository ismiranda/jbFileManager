<?php
//BEGIN CONFIG

//Root directory for upload 
$dir_root = "..";
$path = "";
$maxsize = 200000;

//END CONFIG


//CONTROLER
$dir_path = "";

if (!isset($_GET["act"])) 
	die("No action selected");
	
$act = $_GET['act'];

if (isset($_GET["path"]))
	$dir_path = $_GET["path"];

switch ($act){
	case 'root':
		rootName();
		break;
	case 'list': 
		listFolders();
		break;
	case 'open':
		openFolder();
		break;
	case 'create':
		createFolder();
		break;
	case 'rm':
		rmFolder($dir_root.$dir_path);
		break;
	case 'del':
		delFile();
		break;
	case 'upload':
		upload();
		break;
	default:
		listFolders();
}


//FUNCTIONS

//Get the name of root directory
function rootName(){
	global $dir_root;
	
	echo substr(realpath($dir_root),strrpos(realpath($dir_root), DIRECTORY_SEPARATOR)+1);
}

//List subfolders of current folder
function listFolders(){
	global $dir_root;
	global $dir_path;

	$dir = dir($dir_root.$dir_path);
	$num = 0;
	$folders = array();
	while (($file = $dir->read()) != false){
		$caminho = $dir_root.$dir_path.'/';
		if (is_dir($caminho.$file) && $file != '.' && $file != '..'){
			$subfolder = hasSubFolder($caminho.$file);
			
			$folder = array('name'=>$file, 'link'=> "$dir_path/$file", 'subfolder'=>$subfolder);
			
			array_push($folders,$folder);
		}
	}
	
	$dir->close();
	
	echo json_encode($folders);
}

//List files of current folder
function openFolder(){
	global $dir_root;
	global $dir_path;
	$dir = dir($dir_root.$dir_path);
	$num = 0;
	$files = array();
	
	while (($file = $dir->read()) != false){
		$caminho = $dir_root.$dir_path.'/';
		if (!is_dir($caminho.$file)){
			
			$tmp = array('name'=>htmlentities($file, ENT_QUOTES, "ISO-8859-1"), 'link'=> htmlentities($dir_path."/".$file, ENT_QUOTES, "ISO-8859-1"), 'class'=> getClass($file));
				
			array_push($files,$tmp);
		}
	}
	
	$dir->close();
	
	echo json_encode($files);
}

//Check if a folder has subfolder
function hasSubFolder($d){
	$files=scandir($d);
	foreach ($files as $file)  {
		if ($file == '.' || $file == '..')	continue;
		elseif (is_dir($d.'/'.$file)) return true;
	}
	
	return false;
}

//Get file type
function getClass($mime){
	if (preg_match('/(.zip|.7z|.jar|.rar|.bz)$/i', $mime))
		return 'compress';
	elseif (preg_match('/(.xml|.txt)$/i', $mime))
		return 'text';
	elseif (preg_match('/(.wma|.mp3|.ogg)$/i', $mime))
		return 'audio';
	elseif (preg_match('/(.wmv|.avi|.mpg|.mpeg)$/i', $mime))
		return 'video';
	elseif (preg_match('/(.gif|.jpg|.jpeg|.png|.bmp)$/i', $mime))
		return 'image';
	elseif (preg_match('/(.exe|.bin|.php)$/i', $mime))
		return 'exec';
	elseif (preg_match('/(.htm|.html)$/i', $mime))
		return 'html';
	
	return 'undefined';
}

//Create folder
function createFolder(){
	global $dir_root;
	global $dir_path;
	$folder = "";
	if (isset($_GET["folder"]))
		$folder = $_GET["folder"];

	if ($folder != ""){
		mkdir($dir_root.$dir_path."/".$folder);
	}
}

//Remove folder
function rmFolder($dir) {
	if(substr($dir,-1) == "/") {
		$dir = substr($dir,0,-1);
	}

	if(!file_exists($dir) || !is_dir($dir)) {
		return false;
	} elseif(!is_readable($dir)) {
		return false;
	} else {
		$directoryHandle = opendir($dir);
		 
		while ($contents = readdir($directoryHandle)) {
			if($contents != '.' && $contents != '..') {
				$path = $dir . "/" . $contents;
				 
				if(is_dir($path)) {
					deleteAll($path);
				} else {
					unlink($path);
				}
			}
		}
		 
		closedir($directoryHandle);

		if(!rmdir($dir)) {
			return false;
		}
		 
		return true;
	}
}

//Delete file
function delFile(){
	global $dir_root;
	unlink($dir_root.$_GET['file']);
}

//Upload file
function upload(){
	global $dir_root;
	global $dir_path;
	global $maxsize;
	
	echo "<script>";
	
	if ((($_FILES["file"]["size"] < $maxsize) && ($_FILES["file"]["type"] != "application/octet-stream"))){
		if ($_FILES["file"]["error"] > 0){
			echo "parent.showResult(3,'"+$_FILES["file"]["error"]+"')";
		}else{
			if (file_exists($dir_root.$dir_path."/" . $_FILES["file"]["name"])){
				echo "parent.showResult(2,'"+$_FILES["file"]["name"]+" already exists.')";
			}else{
				move_uploaded_file($_FILES["file"]["tmp_name"],	$dir_root.$dir_path. "/" . $_FILES["file"]["name"]);
				echo "parent.showResult(1,'".($_FILES["file"]["size"] / 1024) . " Kb')";
			}
		}
	}else{
		echo "parent.showResult(4,'Invalid file')";
	}
	
	echo "</script>";
} 
?>