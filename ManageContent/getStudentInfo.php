<?php

//The purpose of this code is to retrieve the students full name based on 
//the team name and the students position on the team.

$teamN   = $_GET['q'];

require_once '../header.php';
include '../timer.php';
session_start();
$tArr = array();

if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')//If compeition has been created
{

    $team = new Team($teamN, 'teamname');
    $users = $team->getUsers();
    //var_dump($users);
   for($i = 0; $i < count($users); $i++)
   {
        array_push($tArr, $users[$i]->lname . "," . $users[$i]->fname);
        array_push($tArr, $users[$i]->username);
        array_push($tArr, $users[$i]->stateabbr);
        array_push($tArr, $users[$i]->schoolabbr);
   }
   
    //var_dump($tArr);
    $r =  json_encode($tArr);
    echo $r;
}
else
	echo "Cookies not set from getFullStudentName";

?>