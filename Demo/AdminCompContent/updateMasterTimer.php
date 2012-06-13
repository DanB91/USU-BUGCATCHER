<?php
$minutes = $_GET['minutes'];
$seconds = $_GET['seconds'];
$comp = $_GET['compID'];
$masterTimer = fopen("../Competitions/".$comp."MasterTimer.txt","w");

if ($minutes < 10)
{
	fwrite($masterTimer,"0".$minutes);
}
else
{
	fwrite($masterTimer,$minutes);
}

if ($seconds < 10)
{
	fwrite($masterTimer,"0".$seconds);
}
else
{
	fwrite($masterTimer,$seconds);
}
fclose($masterTimer);
?>