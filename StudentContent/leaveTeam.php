<?php
require_once "../header.php";
session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$isCaptain = trim($_POST['captain']);

if ($isCaptain){
    $team->removeFromDB();
}

$_SESSION['teamObject']=NULL;
    

?>
