<?php

//The purpose of this code is to check if the competition has ended.
//If the competition has ended, then the compeition becomes read only and no interaction is allowed.
//See student.js for more details.

$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If the competition has been created
{
	$comp = new Competition($compID);
	
	if($comp->hasfinish)
		echo 1;//Competition has ended
	else
		echo 0;//Competition has not ended
}
else
	echo "You must be in a competition";

?>