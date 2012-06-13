<?php

//The purpose of this code is to start the competition.
//A competition is considered started if the competition's hasstarted column is set to 1.

$adminCompID = $_COOKIE['adminCompID'];

if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "UPDATE usedids SET hasstarted='1' WHERE compID='${adminCompID}'";
	mysql_query($sql);
	
	echo "Success";
}
else
	echo "You must create a competition before you can start it";

?>
