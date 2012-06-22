<?php

require_once '../header.php';
session_start();

if(isset($_SESSION['adminObject']))
{
    if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
    {
        $admin = $_SESSION['adminObject'];
        $compN = $_COOKIE['compN'];

        if($admin->getCompetitionByCompName($compN)->pausestate === '0000-00-00 00:00:00')
        {
            echo "not paused";
        }
        else
            echo "paused";
    }   
    else
        echo "Please select a competition";       
}
else
    header( 'Location: index.html');
  

?>
