<?php

require_once '../header.php';
session_start();
//Variable to create the Master Timer file and to write the starting competition time to it
$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

if($admin->getCompetitionByCompName($compN)->starttime !== '0000-00-00 00:00:00')
{
    
    $elapsedMins = '';
    $elapsedSecs = '';
    $minsLeft = '';
    $secsLeft = '';
    
    $duration = $admin->getCompetitionByCompName($compN)->duration;
    
    $startTime = $admin->getCompetitionByCompName($compN)->starttime;
    $startTime = substr($startTime, -8);
    $startTimeArr = explode(":", $startTime);
    
    $currentTime = date("H:i:s");
    $currentTime = substr($currentTime, -8);
    $currentTimeArr = explode(":", $currentTime);
    
    //var_dump($startTimeArr);
    
    if($currentTimeArr[0] == $startTimeArr[0])//If the hours are equal
    {
        $elapsedMins = $currentTimeArr[1] - $startTimeArr[1];
        
        if($currentTimeArr[2] > $startTimeArr[2])//Seconds
        {
           $elapsedSecs = $currentTimeArr[2] - $startTimeArr[2];
        }
        else
        {
           $elapsedMins = $elapsedMins - 1;
           $elapsedSecs = 60 - $startTimeArr[2];
           $elapsedSecs = $elapsedSecs + $currentTimeArr[2];
           
           if($elapsedSecs >= 60)
           {
               $elapsedSecs = $elapsedSecs - 60;
               $elapsedMins = $elapsedMins + 1;
           }
        }
    }
    else
    {
        //TODO: Add the code to handle the case that the hours are not equal
    }
           
    if($elapsedSecs == 0)
    {
        $minsLeft = $duration - $elapsedMins;
        $secsLeft = '00';
        
        if($secsLeft < 10)
            $secsLeft = '0' . $secsLeft;
        
        if($minsLeft < 10)
            $minsLeft = '0' . $minsLeft;
        
    }
    else 
    {
        $minsLeft = $duration - $elapsedMins - 1;
        $secsLeft = 60 - $elapsedSecs;
        
        if($secsLeft < 10)
            $secsLeft = '0' . $secsLeft;
        
        if($minsLeft < 10)
            $minsLeft = '0' . $minsLeft;
    }
    
    if($elapsedMins < 10)
        $elapsedMins = '0' . $elapsedMins;
    if($elapsedSecs < 10)
        $elapsedSecs = '0' . $elapsedSecs;
    
    $timeElapsed = $elapsedMins . $elapsedSecs;
    
    $timeLeft = $minsLeft . $secsLeft;
    
    echo  $timeLeft;
}
else
    echo "0000";

?>
