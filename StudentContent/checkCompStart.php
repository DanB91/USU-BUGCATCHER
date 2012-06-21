<?php


require_once "../header.php";
session_start();

$comp = $_SESSION['compObject'];

if($comp!=NULL)//If the competition has been created 
{
	if($comp->hasStarted())
		echo 1;//The competition has started
	else
		echo 0;//The competition has not started
}
else
	echo "You must be in a competition";

?>