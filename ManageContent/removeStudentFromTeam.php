<?php		  

//The purpose of this code is to remove a student that has been placed on a team
//If a student is on a team, then that student's onteam column in the database is 1
//A student is removed from a team by nulling out that students position on the team
//and setting that student's onteam column back to NULL
//This code is part of team management which can be found under the team management tab on the admin side


$team=$_GET["team"];

require_once '../header.php';
include '../timer.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')//If competition has been created
{
    $team = new Team($team);
    $team->removeTeamFromCompetition($admin->getCompetitionByCompName($compN));	
}
else
	echo"Cookies not set from placeStudentOnTeam";

?>