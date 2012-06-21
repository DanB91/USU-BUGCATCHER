<?php
require_once "header.php";
session_start();

$team = $_SESSION['teamObject'];

$_SESSION['compObject']=new Competition($_GET['compS']);
$comp=$_SESSION['compObject'];

$password = $_POST['pword'];


try{
    $team->addTeamToCompetition($comp);
    echo 1;
}
catch(BugCatcherException $e){
    echo 1;
}

?>
