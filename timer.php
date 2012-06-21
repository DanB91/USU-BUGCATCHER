<?php
//Precondition: Takes two time stamps for the format H:i:s 
//Postcondition: Calculates the difference between the two time stamps and returns
//in the format of i:s where i can be > 60 if hours > 0
function diffTime($time1, $time2)
{
    
    //Variables
    $elapsedMins = '';
    $elapsedSecs = '';
    
    $time1 = explode(":", $time1);
    
    $time2 = explode(":", $time2);
    
    $time1Secs = $time1[0] * 3600 + $time1[1] * 60 + $time1[2];
    $time2Secs = $time2[0] * 3600 + $time2[1] * 60 + $time2[2];
    
    $elapsedSecs2 = $time1Secs - $time2Secs;
    
    $elapsedMins = (int)($elapsedSecs2 / 60);
    $elapsedSecs = $elapsedSecs2 % 60;
    
    return $elapsedMins . ":" . $elapsedSecs;
    
}

//Precondition: Must provide a valid competition object
//Postcondition: Returns the remaining time in i:s format
function getRemainingTime($obj)
{
    $duration = $obj->duration;
    $startTime = $obj->starttime;
  
    $startTime = substr($startTime, -8);
    
    $currentTime = date("H:i:s");
    $currentTime = substr($currentTime, -8);
    
    if($obj->hasfinish == 0)
    {
        if($obj->starttime !== '0000-00-00 00:00:00')
        {

            if($obj->pausestate == '0000-00-00 00:00:00')
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
                    return $timeLeft;

            }
            else
                echo "paused";

    }
        else
            echo "0000";
    }
    else
        echo "stop";
}

//Precondition: Must provide a valid competition object
//Postcondition: Returns true if the competition has concluded false otherwise
function hasFinished($obj)
{
    $timeStampSecs = strtotime($obj->starttime);
    $durationSecs = ($obj->duration) * 60;
    $currTimeSecs = strtotime(date("Y-m-d H:i:s"));
    
    if($timeStampSecs + $durationSecs > $currTimeSecs)
        return false;
    else
        return true;
}


?>
