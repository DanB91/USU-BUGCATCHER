<?php

//The purpose of this code is to show the student the code that they will be debugging.
//The code also shows the code as if it were written in a compiler.
//See prettyprint for more details

set_error_handler('error');

header("Content-type:text/html");

require_once "../timer.php";
require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];
$team = $_SESSION['teamObject'];

$problem = $_POST["problem"];
$coverage = trim($_POST["coverage"]);

//$probNum = $_POST['index'];
//$NumProbsC = 0;

if($comp!=null)
{
        
	//$fileComp=file("../Competitions/${compID}/${compID}.txt");//get number of allowed problems

        if(!file_exists("../Problems/${problem}/${problem}.txt"))
        {
            echo "Problem not available.";
            return;
        }
        
	$fileCode=file("../Problems/${problem}/${problem}.txt");
	$problemTxt = "";
        
        $isPaused = $comp->isPaused();
	
	/*$coverageFileLoc = "../Competitions/".$comp->compid."/".$comp->compid.$team->teamname."${problem}Coverage.txt";
	if(!file_exists($coverageFileLoc)) //create the coverage file if it doesn't exist
	{
		$coverageFile = fopen($coverageFileLoc, "w+");
		fclose($coverageFile);
	}
	
	$covFile=explode("\n", file_get_contents($coverageFileLoc));
	$covIndex = 0;*/

	if(!$isPaused)
	{
		for($i = 0; $i < count($fileCode); $i++)//get file contents
		{
			/*if($coverage == '1') //if coverage is enabled
			{
				if($covIndex < count($covFile) && $i == $covFile[$covIndex])
				{
					$problemTxt .= "<SPAN style='BACKGROUND-COLOR: #66CCCC'>" . rtrim($fileCode[$i]) . "</SPAN><br />";
					$covIndex++; //incerement by two because the array has stuff in every other index
				}
				else $problemTxt .= $fileCode[$i];
			}
			else*/ $problemTxt .= $fileCode[$i];
		}
		$problemTxt = realStringReplace('<', '&lt', $problemTxt);
		//file_put_contents("C:/Dropbox/htdocs/NewDesign/Problems/$problem/textProblem.txt", $problemTxt);
		echo $problemTxt;
	}
	else
		echo "Once the competition starts the code will be displayed here.";
}
else
	echo "You must be in a competition to view code and requirements.";


//error handler
function error($errNo, $errStr)
{
	echo 'Error: ' . $errStr;
	die();
}


function realStringReplace($toReplace, $replacement, $string)
{
    $pos = strpos($string, $toReplace);
    while($pos){
	$string = substr_replace($string, $replacement, $pos, strlen($toReplace));
	$pos = strpos($string, $toReplace, $pos+1);
    }
    return $string;
}

?>
