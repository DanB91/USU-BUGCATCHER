<?php
require_once '../header.php';
session_start();

if(isset($_SESSION['adminObject']))
{
    if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
    {
        $admin = $_SESSION['adminObject'];
        $compN = $_COOKIE['compN'];

        //Store the start time of the competition in the db
        $temp = $admin->getCompetitionByCompName($compN);
        if($temp->starttime === '0000-00-00 00:00:00')
        {
                $temp->starttime = date("Y-m-d H:i:s");
                $temp->commitToDB();
        } 
    }
    else
        echo "99999"; 
}
else
    header( 'Location: index.html');


?>
