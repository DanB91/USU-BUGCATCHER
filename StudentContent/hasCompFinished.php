<?php

//The purpose of this code is to check if the competition has ended.
//If the competition has ended, then the compeition becomes read only and no interaction is allowed.
//See student.js for more details.
require_once "../header.php";
session_start();
$comp = $_SESSION['compObject'];
if($comp->compid){
    echo $comp->hasfinish;
}
else
	var_dump($comp);//echo "You must be in a competition";

?>