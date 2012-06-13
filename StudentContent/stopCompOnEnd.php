<?php

//The purpose of this code is to stop the competition when it has concluded by setting the hasfinished column in the database to 1

$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If comp has been created
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "UPDATE usedids SET hasfinished='1' WHERE compID='${compID}'";
	mysql_query($sql);

}

?>