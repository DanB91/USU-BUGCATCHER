<?php
    require 'Models/Competition.php';
    session_start();
    $compID = $_GET['compID'];
    $CompOject = new Competition($compID);
    
    $_SESSION['competitionObject'] = $CompOject;
     setcookie("compN", $CompOject->compname, time() + 60 * 60 * 24 * 30);
    echo "You now control $CompOject->compname";
    
?>
