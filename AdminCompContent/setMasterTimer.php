<?php
//Variable to create the Master Timer file and to write the starting competition time to it
$time = $_GET['time'];
$comp = $_COOKIE['adminCompID'];
	
//Opens the Master Timer file and writes the starting competition time to the file
$timerFile = fopen("../Competitions/${comp}/${comp}MasterTimer.txt","w");
if ($time < 10)
{
  fwrite($timerFile,"0".$time."00");
}
else
{
  fwrite($timerFile,$time."00");
}

//Closes the Master Timer file and returns the time the Timer was set to for the competition back to the administrator
fclose($timerFile);
echo "Timer set to: ".$time." minutes.";
?>
