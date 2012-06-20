<?php

require_once '../header.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

//Store the start time of the competition in the db


    $temp = $admin->getCompetitionByCompName($compN);
    $temp->hasfinish = 1;
    $temp->commitToDB();
    //echo $admin->getCompetitionByCompName($compN)->starttime;


?>
