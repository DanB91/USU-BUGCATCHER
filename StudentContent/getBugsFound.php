<?php
//This code is ran every several seconds and checks to see if the number of bugs the team has found has changed.
//The number of bugs found is returned and updated on the student side.
//See student.js for more details

require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];
$team = $_SESSION['teamObject'];

if($comp!=null)//If the user is correctly logged in
{
	if($team != null)//If on a team
	{

		echo $team->getBugCount($comp);
	}
	else echo 0;

}
else echo 0;



?>
