<?php
require_once "../header.php";
session_start();

$comp = $_SESSION['compObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$chatText = $_GET['string'];

if($comp!=null && $user!=null)
{
	if($team!=null)
	    $user->sendChat($comp->compid, $chatText, $team->teamid);
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>