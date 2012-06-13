<?php
$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "UPDATE usedids SET hasfinished='1' WHERE compID='${compID}'";
	mysql_query($sql);

}

?>