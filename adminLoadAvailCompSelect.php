<?php
    require 'Models/Competition.php';
    $compID = $_GET['compID'];
    $CompOject = new Competition($compID);
    session_start();
    $_SESSION['competitionObject'] = $CompOject;
     setcookie("compN", $CompOject->compname, time() + 60 * 60 * 24 * 30);
    echo "You now control $CompOject->compname";
    
?>
