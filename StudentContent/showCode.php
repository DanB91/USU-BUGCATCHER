<?php

//The purpose of this code is to show the student the code that they will be debugging.
//The code also shows the code as if it were written in a compiler.
//See prettyprint for more details

set_error_handler('error');



$problem = $_GET["problem"];
$coverage = trim($_GET["coverage"]);
$compID = $_COOKIE['compID'];
$userID = $_COOKIE['userID'];
$probNum = $_GET['index'];
$NumProbsC = 0;

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{
	$fileComp=file("../Competitions/${compID}/${compID}.txt");//get number of allowed problems

        if(!file_exists("../Problems/${problem}/${problem}.txt"))
        {
            echo "Problem not available.";
            return;
        }
        
	$fileCode=file("../Problems/${problem}/${problem}.txt");
	$problemTxt = "";

	//var_dump($fileCode);

	$fileComp=file("../Competitions/${compID}/${compID}.txt");
	$rest = $probNum;
	
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$started = $row['hasstarted'];
	
	$sql="SELECT * FROM ${compID}students WHERE userID='${userID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$teamName = $row['teamName'];
	
	$coverageFileLoc = "C:/Dropbox/htdocs/NewDesign/Competitions/$compID/$compID$teamName${problem}Coverage.txt";
	if(!file_exists($coverageFileLoc)) //create the coverage file if it doesn't exist
	{
		$coverageFile = fopen($coverageFileLoc, "w+");
		fclose($coverageFile);
	}
	
	//$covFile=file($coverageFileLoc);
	$covFile=explode("\n", file_get_contents($coverageFileLoc));
	//var_dump($covFile);
	$covIndex = 0;
//	var_dump($covFile);

	if($started == 1)//Displays the number of problems specified by the admin
	{
		for($i = 0; $i < count($fileCode); $i++)//get file contents
		{
			if($coverage == '1') //if coverage is enabled
			{
				//$problemTxt .= "Line: " .$i . " Coverage: " . $covFile[$covIndex] . "CovIndex: " . $covIndex ."\n";
				if($covIndex < count($covFile) && $i == $covFile[$covIndex])
				{
					$problemTxt .= "<SPAN style='BACKGROUND-COLOR: #66CCCC'>" . rtrim($fileCode[$i]) . "</SPAN><br />";
					$covIndex++; //incerement by two because the array has stuff in every other index
				}
				else $problemTxt .= $fileCode[$i];
			}
			else $problemTxt .= $fileCode[$i];
		}
		substr_replace("<",'&alt',$problemTxt);
		file_put_contents("C:/Dropbox/htdocs/NewDesign/Problems/$problem/textProblem.txt", $problemTxt);
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


?>
