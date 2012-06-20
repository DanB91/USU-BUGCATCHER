
<?php

require_once '../header.php';
include 'timeStampManip.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];


    
    $duration = $admin->getCompetitionByCompName($compN)->duration;
    $startTime = $admin->getCompetitionByCompName($compN)->starttime;
  
    $startTime = substr($startTime, -8);
    
    $currentTime = date("H:i:s");
    $currentTime = substr($currentTime, -8);

if($admin->getCompetitionByCompName($compN)->hasfinish == 0)
{
    if($admin->getCompetitionByCompName($compN)->starttime !== '0000-00-00 00:00:00')
    {
        
        if($admin->getCompetitionByCompName($compN)->pausestate == '0000-00-00 00:00:00')
        {
        
                $diff = diffTime($currentTime, $startTime);
                //echo $diff;
                $diffArr = explode(":", $diff);
                
                $elapsedMins = $diffArr[0];
                $elapsedSecs = $diffArr[1];
                $secsLeft = '';
                $minsLeft = '';
                
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

                $timeLeft = $minsLeft . $secsLeft;
                echo  $timeLeft;
                  
        }
        else
            echo "paused";
 
 }
    else
        echo "0000";
}
else
    echo "stop";


?>


