<?php

//The code checks to see if the competition has started and returns the correct result
//The information is stored on the database under usedids
//The code is called only at the begining of the competition until the competition starts
//0 indicates has not started 
//1 indicates has started

$compID = $_COOKIE['compID'];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If the competition has been created 
{
	$con = mysql_connect("localhost", "guest", "");
	mysql_select_db("competition", $con);
	$sql = "SELECT * FROM usedids WHERE compID='${compID}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);//Retrieve the row in the database
        
        
	if($row['hasstarted'] == 1)
		echo 1;//The competition has started
	else
		echo 0;//The competition has not started
}
else
	echo "You must be in a competition";

?>