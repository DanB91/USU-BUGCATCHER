<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.

require_once "../timer.php";
require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];
$probname = $_POST["problem"];
$PROBLEM = new PROBLEM($probname, "problemname");

if($comp!=null)//If the competition has been created
{
    
	echo  $PROBLEM->tooltip;
	
}
else
	echo "You must be in a competition to view example input/output.";
	
?>