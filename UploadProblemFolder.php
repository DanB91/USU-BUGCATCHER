<?php
require_once 'Models/Problem.php';
require_once 'Models/Admin.php';

set_exception_handler('exceptionHandler');
set_error_handler('errorHandler');


//Variablse needed for Problem Upload
$fileName = "";
session_start();
$AdminUsername = $_SESSION['adminObject']->username;


//Checks to see if the file is over 100Kb
if ($_FILES["file"]["size"] > 102400)
{
        
	alert("File is too large.");
        die();
}

if ($_FILES["file"]["type"] == "application/octet-stream" || $_FILES["file"]["type"] == "application/x-zip-compressed"||
         $_FILES["file"]["type"] == "application/zip")
{
	if ($_FILES["file"]["error"] > 0)
	{
           alert("Return Code: " . $_FILES["file"]["error"] . "<br />");
	   die();
	}
	else
	{
		$fileName = $_FILES["file"]["tmp_name"];
                $tmpArray = explode('.', $_FILES['file']['name']);
                $problemName = $tmpArray[0]; //get problem name
		$zip = new ZipArchive;
		$zip->open($fileName);
		if ($zip->open($fileName) === TRUE) {
				$zip->extractTo("Uploads/".$AdminUsername."/Problems/");
				$zip->close("Uploads/".$AdminUsername."/Problems/");
                                storeInDB("Uploads/".$AdminUsername."/Problems/" . $problemName . '/', $problemName, $AdminUsername);
				alert('Upload Complete');
                                
		} else {
				alert("Upload Failed"); 
		}
	}
}
else
{
    alert("Incorrect File Format.");
    die();
}



/**
 * Stores the given problem in the database
 * @param string $path is the path contains the problem folder
 * @param string $problemName the problem name
 */
function storeInDB($problemPath, $problemName, $adminName)
{

   
    $difficulty = getProblemDifficulty($problemPath . 'difficulty.txt');
    
    $problemData = array('problemname' => $adminName.$problemName, 'requirements' => file_get_contents($problemPath . $problemName. 'Req.txt'),
        'oraclepath' => $problemPath . $problemName . 'Oracle.jar', 'allbugspath' => $problemPath . $problemName . '.jar',
        'srcpath' => $problemPath . 'src/', 'problemdifficulty' => $difficulty);
    
    $bugsData = getBugsData($problemPath);
    
    Problem::addProblemToDB($problemData, $bugsData);
    
    
}

function getBugsData($problemPath)
{
    $filesInDir = scandir($problemPath);
    $bugsData = array(); //return value
    $bugFilesInDir = array();
    
    foreach ($filesInDir as $key => $value) {
        //if the file is a runnable bug file add it in
        if (preg_match('/.*bug[\d]*\.jar/i', $value)) {
            $bugFilesInDir[] = $value;
        }
    }
    
    if(!count($bugFilesInDir))
        trigger_error('Problem does not contain any bugs!');
    
    foreach($bugFilesInDir as $value)
        $bugsData[] = array('abpath' => $problemPath.$value);
    
    return $bugsData;
    
    
    
    
    
}

function getProblemDifficulty($pathToDifficultyFile)
{
    $fileContents = file($pathToDifficultyFile);
    $difficulty = '';
    
    switch($fileContents[0])
    {
        default:
        case '0':
            $difficulty = 'VE';
            break;
        case '1':
            $difficulty = 'E';
            break;
        case '2':
            $difficulty = 'M';
            break;
        case '3':
            $difficulty = 'H';
            break;
        case '4':
            $difficulty = 'VH';
            break;
        
    }
    
    return $difficulty;
}

function alert($msg)
{
   echo '<script language="javascript">alert("'.$msg.'"); top.document.getElementById("uploadWrapper").innerHTML = \'<input type="file" name="file" id="file" />\';</script>';
}

function exceptionHandler($exception) {
    alert("Uncaught exception: " . $exception->getMessage(). "\n");
    die();
}



function errorHandler($errNo, $errStr)
{
  alert("Error: " . "[$errNo] ". $errStr, "\n");
  die();
}


?>