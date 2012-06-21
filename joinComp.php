<?php
require_once "header.php";
session_start();

$team = $_SESSION['teamObject'];

$_SESSION['compObject']=new Competition($_POST['compS']);
$comp=$_SESSION['compObject'];

$passwordEntered = crypt($_POST['pword'], SALT);
$correctPassword = $comp->password;


try{
    if ($correctPassword == NULL)
    {
        $team->addTeamToCompetition($comp);
        echo 1;
    }
    elseif ($correctPassword == $passwordEntered)
    {
        $team->addTeamToCompetition($comp);
        echo 1;
    }
    else echo $passwordEntered .",". $correctPassword;
}
catch(BugCatcherException $e){
    echo 1;
}

?>
