<?php
session_start();
//Variable to create the Master Timer file and to write the starting competition time to it
$currComp = $_SESSION['currComp'];

if($currComp->starttime == '0000-00-00 00:00:00')
    $currComp->starttime = time();
else
    echo  $currComp->starttime;

?>
