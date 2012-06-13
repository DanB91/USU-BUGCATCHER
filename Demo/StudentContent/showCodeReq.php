<?php
$problem = $_GET["problem"];
$compID = $_COOKIE['compID'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{
	$fileReq=fopen("../Problems/${problem}/${problem}Req.txt", "r");
	$fileComp=file("../Competitions/${compID}.txt");
	$rest = substr($problem, -1);//Returns the last character in the string which is the problem #
	
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$started = $row['hasstarted'];
	
	if($rest <= $fileComp[1] && $started == 1)//Displays the number of problems specified by the admin
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
		echo "No content available.";
}
else
	echo "You must be in a competition to view code and requierments.";
	
?>