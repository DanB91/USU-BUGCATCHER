<?php

//The purpose of this code is to completely delete a team from a competition.
//If there are students on the team that is to be removed, then the students 
//are first removed and their onteam column in the database is set to null.
//When a team is removed the team is completely removed from the database and the team name can be used again.
//NOTE: There is currently no button on the team management tab to remove a team.

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