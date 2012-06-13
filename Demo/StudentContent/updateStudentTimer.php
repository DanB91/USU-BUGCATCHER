<?php
$comp = $_COOKIE['compID'];
$masterTimer = fopen("../Competitions/".$comp."MasterTimer.txt","r");
echo fgets($masterTimer);
fclose($masterTimer);
?>