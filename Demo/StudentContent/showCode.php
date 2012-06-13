<?php
$problem = $_GET["problem"];
$coverage = $_GET["coverage"];
$compID = $_COOKIE['compID'];
$userID = $_COOKIE['userID'];
$isJava = 1;  // If 0 it will show Java code, If 1, it shows C++ code.

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{
	$fileComp=file("../Competitions/${compID}.txt");//get number of allowed problems
	$isJava = $fileComp[4];
	
	if ($isJava == 0)
	{
		$fileCode=file("../Problems/${problem}/${problem}.txt");
		$problemTxt = "<pre class='prettyprint lang-java linenums'>"; //need to get the language and change the pretty print here
	}
	else
	{
		$fileCode=file("../Problems/C++Problems/${problem}/${problem}.txt");
		$problemTxt = "<pre class='prettyprint lang-cpp linenums'>"; //this will give c++ pretty print
	}

	$fileComp=file("../Competitions/${compID}.txt");
	$rest = substr($problem, -1);//Returns the last character in the string which is the problem #
	
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
	
	$coverageFileLoc = "../Competitions/${compID}${teamName}Problem${rest}Coverage.txt";
	if(!file_exists($coverageFileLoc)) //create the coverage file if it doesn't exist
	{
		$coverageFile = fopen($coverageFileLoc, "w+");
		fclose($coverageFile);
	}
	
	//$covFile=file($coverageFileLoc);
	$covFile=explode("\n", file_get_contents($coverageFileLoc));
	$covIndex = 0;
	
	if($rest <= $fileComp[1] && $started == 1)//Displays the number of problems specified by the admin
	{
		for($i = 0; $i < count($fileCode); $i++)//get file contents
		{
			if($coverage === "true") //if coverage is enabled
			{
				//$problemTxt .= "Line: " .$i . " Coverage: " . $covFile[$covIndex] . "CovIndex: " . $covIndex ."\n";
				if($i == $covFile[$covIndex])
				{
					$problemTxt .= "<SPAN style='BACKGROUND-COLOR: #66CCCC'>" . $fileCode[$i] . "</SPAN>";
					$covIndex+=2; //incerement by two because the array has stuff in every other index
				}
				else $problemTxt .= $fileCode[$i];
			}
			else $problemTxt .= $fileCode[$i];
		}
		$problemTxt .= "</pre>";
		echo $problemTxt;
	}
	else
		echo "No content available.";
}
else
	echo "You must be in a competition to view code and requierments.";
?>