<?php

require_once '../header.php';

include '../timer.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

$startTimeStamp = $admin->getCompetitionByCompName($compN)->starttime;
$startTime = substr($startTimeStamp, -8);
$startDate = substr($startTimeStamp, 0, 10);
$startTimeArr = explode(":", $startTime);


$pauseTime = $admin->getCompetitionByCompName($compN)->pausestate;
$pauseTime = substr($pauseTime, -8);
$currentTime = date("H:i:s");

$totalTimePaused = diffTime($currentTime, $pauseTime);

$totalTimePausedArr = explode(":", $totalTimePaused);

$tempHrs = $startTimeArr[0];
$tempMins = $startTimeArr[1] + $totalTimePausedArr[0];
$tempSecs = $startTimeArr[2] + $totalTimePausedArr[1];

if($tempSecs >= 60)
{
    $tempSecs = $tempSecs - 60;
    $tempMins = $tempMins + 1;
}

if($tempMins > 60)
{
    $tempMins = $tempMins - 60;
    $tempHrs = $tempHrs + 1;
}

if(strlen($tempHrs) == 0)
    $tempHrs = "00";
elseif(strlen($tempHrs) == 1)
    $tempHrs = "0" . $tempHrs;

if(strlen($tempMins) == 0)
    $tempMins = "00";
elseif(strlen($tempMins) == 1)
    $tempMins = "0" . $tempMins;

if(strlen($tempSecs) == 0)
    $tempSecs = "00";
elseif(strlen($tempSecs) == 1)
    $tempSecs = "0" . $tempSecs;

$newStartTime = $startDate . " " . $tempHrs . ":" . $tempMins . ":" . $tempSecs;



$temp = $admin->getCompetitionByCompName($compN);
$temp->pausestate = "0000-00-00 00:00:00";
$temp->commitToDB();  

$temp = $admin->getCompetitionByCompName($compN);
$temp->starttime = $newStartTime;
$temp->commitToDB();  

?>
