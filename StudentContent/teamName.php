<?php

if(isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '' && isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{

	$userID = $_COOKIE['userID'];
	$comp = $_COOKIE['compID'];

	$con = mysql_connect('localhost', 'guest', '');
	mysql_select_db("competition", $con);
	$sql="SELECT * FROM ${comp}students WHERE userID ='${userID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);

	if($row['teamName'])
		echo 'On team: ' . $row['teamName'];
	else
		echo 'Not on team';


}
else echo 'Student not in compition';
?>
