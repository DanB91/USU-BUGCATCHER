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

?>
