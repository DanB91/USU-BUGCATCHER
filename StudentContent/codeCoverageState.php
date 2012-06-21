<?php
//The code checks to see if the competition is allowed to display code coverage
//If code coverage is not allowed, then the radio buttons are disabled
//0 indicates that the students are not allowed to use code coverage
//1 indicates that code coverage is allowed
require_once "../header.php";
session_start();
$comp = $_SESSION['compObject'];

if($comp->compid)//If the competition has been created
{
	if($comp->codeCoverage)
		echo "SET";
	else
		echo "NOTSET";
}
else 
	echo "You must be part of a competition to use code coverage";

?>