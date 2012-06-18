<?php
session_start();
$currComp = $_SESSION['currComp'];



//Variable to create the Master Timer file and to write the starting competition time to it
$time = $_GET['time'];
$comp = $_COOKIE['adminCompID'];

$currComp->starttime = $_SERVER['REQUEST_TIME'];

echo "Timer set to: ".$time." minutes.";
?>
