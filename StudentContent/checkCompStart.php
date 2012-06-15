<?php

//This will probably not be used soon.

$compID = $_COOKIE['compID'];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If the competition has been created 
{
	/*$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);//Retrieve the row in the database*/
        
        $comp = new Competition('compID');
        
	if(!$comp->isPaused())
		echo 1;//The competition has started
	else
		echo 0;//The competition has not started or is paused
}
else
	echo "You must be in a competition";

?>