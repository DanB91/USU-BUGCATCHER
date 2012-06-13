<?php
//Timer variables and competition ID variable, needed to update the Master Timer on the server
$minutes = $_GET['minutes'];
$seconds = $_GET['seconds'];
$comp = $_COOKIE['adminCompID'];

//Opens the file containing the Master Time for the current competition
$masterTimer = fopen("../Competitions/${comp}/".$comp."MasterTimer.txt","w");

//Outputs the time to the Master Timer file; accounts for leading zeros
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

//Closes the Master Timer file
fclose($masterTimer);
?>