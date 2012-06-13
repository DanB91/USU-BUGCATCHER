<?php
$compID = $_COOKIE['compID'];
$userID		= $_COOKIE['userID'];
$chat = $_GET['string'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '' && isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')
{

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}students WHERE userID = '".$userID."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$onTeam = $row['onTeam'];
	$userName = $row['username'];
	
	if($onTeam == '1')
	{
		
		$teamName = $row['teamName'];
		$file=fopen("../Competitions/${compID}${teamName}Content.txt", "a");
                
                
		fwrite($file, $userName.": ".$chat);
		fwrite($file, "<!@!>");
	
		fclose($file);
		
		mysql_close($con);
		
		echo $chat;
	}
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>