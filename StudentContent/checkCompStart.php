<?php


require_once "../header.php";
session_start();

$comp = $_SESSION['competitionObject'];

if($comp->compid)//If the competition has been created 
{
	if(!$comp->isPaused())
		echo 1;//The competition has started
	else
		echo 0;//The competition has not started or is paused
}
else
	echo "You must be in a competition";

?>