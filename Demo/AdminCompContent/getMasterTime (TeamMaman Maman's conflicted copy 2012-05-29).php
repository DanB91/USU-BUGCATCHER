<?php
$comp = $_GET['compID'];
if(file_exists("../Competitions/".$comp."MasterTimer.txt"))
{
	$masterTimer = fopen("../Competitions/".$comp."MasterTimer.txt","r");
	echo fgets($masterTimer);
	fclose($masterTimer);
}
?>