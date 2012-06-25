<?php

//The purpose of this code is to write a custom hint to the competition content file

require_once '../header.php';
        session_start();

if(isset($_SESSION['adminObject']))
{   
    if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')//If competition has been selected.
    {
        $admin = $_SESSION['adminObject'];
        $compN = $_COOKIE['compN'];

        $customHint = $_GET["customHint"];

        $customHint = mysql_real_escape_string($customHint);
        $admin->sendCustHint($admin->getCompetitionByCompName($compN)->compid, $customHint);    
    }
}
else
    header( 'Location: index.html');
?>