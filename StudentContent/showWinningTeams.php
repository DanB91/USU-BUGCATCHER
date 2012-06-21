<?php

//The purpose of this code is to display the top three teams
//and their place in the competition.
//The teams are sorted based on bugs found and if two teams have the same 
//number of bugs the tie is resolved based on total time of bugs found.
//For example if a team finds a bug at 60 mins, then 60 mins will be added to time of bugs found. 
//The team with the most time and or most bugs will be declared the winning team.
//See Student.js for more details
require_once "../header.php";
session_start();

$comp = $_SESSION['compObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];

if($comp!=null&&$user!=NULL&&$team!=null)//if the competition has been created and the user is loged in correctly
{
	$count = 0;
	$resultString = '';
	
	$leader=new Leaderboard($comp);
	$topArr=$leader->getStats();
	$numTeams=$comp->getNumTeams();
	var_dump($topArr);
	$resultString .= "1st: " . $topArr[0]['teamName'];
	$resultString .= formatBugsFoundString($topArr[0]['bugsFound']);
	if($numTeams>1){
	    $resultString .= "2nd: " . $topArr[1]['teamName'];
	    $resultString .= formatBugsFoundString($topArr[1]['bugsFound']);
	}
	if($numTeams>2){
	    $resultString .= "3rd: " . $topArr[2]['teamName'];
	    $resultString .= formatBugsFoundString($topArr[2]['bugsFound']);
	}

	
	echo $resultString;
}
else
	echo 0;


function formatBugsFoundString($bugsFound){
    if ($bugsFound == 1)
	return ", 1 bug found <br>";
    else if ($bugsFound > 1)
	return ", " . $bugsFound . " bugs found <br>";
    else
	return "<br>";
}


?>
