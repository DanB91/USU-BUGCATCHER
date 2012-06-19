<?php
require_once '../header.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];

//Store the start time of the competition in the db
if($admin->getCompetitionByCompName($compN)->starttime === '0000-00-00 00:00:00')
{
    $temp = $admin->getCompetitionByCompName($compN);
    $temp->starttime = date("Y-m-d H:i:s");
    $temp->commitToDB();
    //echo $admin->getCompetitionByCompName($compN)->starttime;
}

?>
