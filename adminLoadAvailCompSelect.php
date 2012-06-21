<?php
    require 'Models/Competition.php';
    $compID = $_GET['compID'];
    $CompOject = new Competition($compID);
    session_start();
    $_SESSION['competitionObject'] = $CompOject;
    echo "You now control this competition";
?>
