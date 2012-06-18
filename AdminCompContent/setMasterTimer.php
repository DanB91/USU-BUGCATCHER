<?php
session_start();
//Variable to create the Master Timer file and to write the starting competition time to it
$admin = $_SESSION['adminObject'];
$compN = $_SESSION['compN'];

//if($currComp->starttime == '0000-00-00 00:00:00')
//    $currComp->starttime = time();
//else
    echo  $admin->getCompetitionByCompName($compN)->starttime;

?>
