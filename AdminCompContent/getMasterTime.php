
<?php

require_once '../header.php';
include '../timer.php';
session_start();

    if(isset($_SESSION['adminObject']))
    {
        if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
        {

            $admin = $_SESSION['adminObject'];
            $compN = $_COOKIE['compN'];


            echo getRemainingTime($admin->getCompetitionByCompName($compN));

    }
    else
        echo "99999";


    }
    else
        header( 'Location: index.html') ;
?>


