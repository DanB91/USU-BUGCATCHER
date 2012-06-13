<?php
$comp = $_GET['compID'];
$fileName = "../Competitions/".$comp."MasterTimer.txt";
if(file_exists($fileName))
{
	$masterTimer = fopen($fileName,"r");
	echo fgets($masterTimer);
	fclose($masterTimer);
}
?>