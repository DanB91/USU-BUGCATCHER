<?php

require_once '../header.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

//Store the start time of the competition in the db
if($admin->getCompetitionByCompName($compN)->pausestate === '0000-00-00 00:00:00')
{
    echo "not paused";
}
else
    echo "paused";




  

?>
