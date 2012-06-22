<?php
require_once 'header.php';
//Variablse needed for Problem Upload
$fileName = "";
session_start();
$AdminUsername = $_SESSION['adminObject']->username;
$error = '';

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
		$zip = new ZipArchive;
		$zip->open($fileName);
		if ($zip->open($fileName) === TRUE) {
				$zip->extractTo("Uploads/".$AdminUsername."/Problems/");
				$zip->close();
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

/*****************************************************/
/*                 Dump To Error Log                 */
/*****************************************************/

function DumpToErrorLog($FileName_Original,$FileName,$FirstName,$LastName,$Username,$Password,$SchoolName,$State)
{
	$length = strlen($FileName) - 3;
	$extension = substr($FileName,$length,3);
	$errorFileName = substr($FileName,0,8);
	$errorIndex = 0;
	if (file_exists("ErrorLogs/" . $errorFileName . ".txt"))//".txt"
	{
		do
		{
			$errorIndex++;
		}while(file_exists("ErrorLogs/" . $errorFileName."(".$errorIndex.").txt"));
		$errorFileName .= "(".$errorIndex.")";
	}
	$errorFileName .= ".txt";
	
	$errorFile = fopen("ErrorLogs/".$errorFileName,"w+");
	
	fwrite($errorFile,"An error occurred during ".strtoupper($extension)." file registration. Below is the information that was being handled at the time of the error.\r\n\r\n");
	
	fwrite($errorFile,"Original File Name: ".$FileName_Original."\r\n");
	fwrite($errorFile,"New File Name: ".$FileName."\r\n");
	fwrite($errorFile,"First Name: ".$FirstName."\r\n");
	fwrite($errorFile,"Last Name: ".$LastName."\r\n");
	fwrite($errorFile,"Username: ".$Username."\r\n");
	fwrite($errorFile,"Password: ".$Password."\r\n");
	fwrite($errorFile,"School Name: ".$SchoolName."\r\n");
	fwrite($errorFile,"State: ".$State."\r\n");
	
	fclose($errorFile);
}



function alert($msg)
{
   echo '<script language="javascript">alert("'.$msg.'"); top.document.getElementById("uploadWrapper").innerHTML = \'<input type="file" name="file" id="file" />\';</script>';
}
?>