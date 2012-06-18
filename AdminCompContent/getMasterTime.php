<?php
require '../Models/User.php';
require '../Models/Admin.php';
//Gets the competition ID from the AJAX call
//$comp = $_COOKIE['adminCompID'];

//Checks to see if the Master Timer file exists
//If it does the time stored in the file is given to the administrator to view
//if(file_exists("../Competitions/${comp}/".$comp."MasterTimer.txt"))
//{
	//$masterTimer = fopen("../Competitions/${comp}/".$comp."MasterTimer.txt","r");
	//echo fgets($masterTimer);
	//fclose($masterTimer);
//}
session_start();

$ADMIN =  $_SESSION['adminObject'];
echo $_SESSION['adminObject']->username . "<br>";
echo $ADMIN->username . "wer";

?>