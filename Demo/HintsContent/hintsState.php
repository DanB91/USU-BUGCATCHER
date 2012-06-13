<?php

$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$file = file("../Competitions/${compID}.txt");

	if($file[2] == 1)
		echo "SET";
	else
		echo "NOTSET";
	}
else 
	echo "You must be part of a competition to use code coverage";

?>