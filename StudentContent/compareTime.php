<?php

$comp = $_COOKIE['compID'];

$sCompFile = file("..\Competitions\\${comp}\\${comp}.txt");

$maxCompTime = $sCompFile[3] * 100;

$sMasterTime = file("..\Competitions\\${comp}\\${comp}MasterTimer.txt");

$sCurrTime = $sMasterTime[0];

$allowedTime = $maxCompTime - $sCurrTime;

if($allowedTime <= 51)
{
    echo 1;
}
else
    echo 0;


?>
