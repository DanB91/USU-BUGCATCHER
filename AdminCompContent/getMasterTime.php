
<?php

require_once '../header.php';
session_start();
//Variable to create the Master Timer file and to write the starting competition time to it
$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

if($admin->getCompetitionByCompName($compN)->hasfinish === 1)
{
    $duration = $admin->getCompetitionByCompName($compN)->duration;
    
    $startTime = $admin->getCompetitionByCompName($compN)->starttime;
    $startTime = substr($startTime, -8);
    $startTimeArr = explode(":", $startTime);
    
    $currentTime = date("H:i:s");
    $currentTime = substr($currentTime, -8);
    $currentTimeArr = explode(":", $currentTime);

//Variables
    $elapsedHours = '';
    $elapsedMins = '';
    $elapsedSecs = '';
    $hoursLeft = '';
    $minsLeft = '';
    $secsLeft = '';


//Precondition: None unless elapsedHours > 1 then currentTime mins must be greater than startTime mins
//Postcondition: Sets the elapsedMins and elapsedSecs the competition has been running
function getMinsSecs()
{
    global $currentTimeArr, $startTimeArr, $elapsedMins, $elapsedSecs;
    
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

if($admin->getCompetitionByCompName($compN)->starttime !== '0000-00-00 00:00:00')
{
    
    //var_dump($startTimeArr);
    
    if($currentTimeArr[0] == $startTimeArr[0])//If the hours are equal
    {
        getMinsSecs();
    }
    else
    {
        
        if($currentTimeArr[1] > $startTimeArr[1])
        {
            $elapsedHours = $currentTimeArr[0] - $startTimeArr[0];
           
            getMinsSecs();
          
            $elapsedMins = $elapsedMins + $elapsedHours*60;
        }
        else
        {
            $elapsedHours = $currentTimeArr[0] - $startTimeArr[0] - 1;
           
            $tempSecs = 60 - $startTimeArr[2];
            $tempMins = 60 - $startTimeArr[1];

            $elapsedMins = $tempMins + $currentTimeArr[1];
            $elapsedSecs = $tempSecs + $currentTimeArr[2];

            if($elapsedSecs > 60)
            {
                $elapsedMins = $elapsedMins + 1;
                $elapsedSecs = $elapsedSecs - 60;
            }
          

            $elapsedMins = $elapsedMins + $elapsedHours*60;
        }
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

        $timeLeft = $minsLeft . $secsLeft;

        echo  $timeLeft;
   
}
else
    echo "0000";
}
else
    echo "STOP!";
?>

<?php
session_start();
//Gets the competition ID from the AJAX call
$comp = $_COOKIE['adminCompID'];


?>

