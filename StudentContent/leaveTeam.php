<?php

$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$isCaptain = $_POST['captain'];

if ($isCaptain)
    $team->removeFromDB();

$_SESSION['teamObject']=NULL;
    

?>
