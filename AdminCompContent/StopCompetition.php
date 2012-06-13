<?php

$adminCompID = $_COOKIE['adminCompID'];

if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "UPDATE usedids SET hasfinished='1' WHERE compID='${adminCompID}'";
	mysql_query($sql);
	
}
else
	echo "You are not logged in.";

?>
