<?php
$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	
	if($row['hasstarted'] == 1)
		echo 1;
	else
		echo 0;
}
else
	echo "You must be in a competition";

?>