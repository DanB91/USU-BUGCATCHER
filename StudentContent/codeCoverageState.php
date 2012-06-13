<?php
//The code checks to see if the competition is allowed to display code coverage
//If code coverage is not allowed, then the radio buttons are disabled
//0 indicates that the students are not allowed to use code coverage
//1 indicates that code coverage is allowed



$compID = $_COOKIE['compID'];
$codeCovState = 2;

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If the competition has been created
{
	$file = file("../Competitions/${compID}/${compID}.txt");//open the file as an array

	if($file[$codeCovState] == 1)
		echo "SET";
	else
		echo "NOTSET";
	}
else 
	echo "You must be part of a competition to use code coverage";

?>