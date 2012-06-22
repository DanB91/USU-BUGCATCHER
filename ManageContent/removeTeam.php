<?php

$team=$_GET["team"];
$nullValue = NULL;

require_once '../header.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
{
        
	$team = new Team($team, "teamname");
	$team->removeTeamFromCompetition($admin->getCompetitionByCompName($compN));
	
}
else
	echo"Cookies not set from removeTeam.php";

?>