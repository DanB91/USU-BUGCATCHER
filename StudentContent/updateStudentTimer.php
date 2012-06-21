<?php
require_once "../timer.php";
require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];

if($comp!=NULL){
    echo getRemainingTime($comp);
}
else
    echo "You must be in a competition";

?>
