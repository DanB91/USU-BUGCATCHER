<?php
require_once "../header.php";
session_start();
$team=$_SESSION['teamObject'];
if($team->teamname!="")
    echo $team->teamname;

else
    echo 'Student not on team';
?>
