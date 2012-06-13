<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.


$problem = $_GET["problem"];
$compID = $_COOKIE['compID'];
$probNum = $_GET['index'];
$NumProbsCR = 0;

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')//If the competition has been created
{
        if(!file_exists("../Problems/${problem}/${problem}Req.txt"))
        {
            echo "Problem not available.";
            return;
        }
    
	$fileReq=fopen("../Problems/${problem}/${problem}Req.txt", "r");
	$fileComp=file("../Competitions/${compID}/${compID}.txt");
	$rest = $probNum;
	
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$started = $row['hasstarted'];
	
	if($rest <= $fileComp[$NumProbsCR] && $started == 1)//Displays the number of problems specified by the admin
	{
	
		$problemTxt = '';

		while( !feof($fileReq))//get file contents
		{
				 $problemTxt .= "<p>";
				$problemTxt .= fgets($fileReq);
				 $problemTxt .= "</p>";
		}
		fclose($fileReq);
		echo $problemTxt;
		//echo "Didn't work";
	}
	else
		echo "Once the compeition starts the requierments will be displayed here.";
}
else
	echo "You must be in a competition to view code and requierments.";
	
?>