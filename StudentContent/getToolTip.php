<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.


$problem = $_GET["problem"];
$compID = $_COOKIE['compID'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')//If the competition has been created
{
        if(!file_exists("../Problems/${problem}/${problem}Ex.txt"))
        {
            echo "No Example input available";
            return;
        }
    
	$fileExamp=fopen("../Problems/${problem}/${problem}Ex.txt", "r");
	$toolTipTxt .= fgets($fileExamp);
	fclose($fileExamp);
	echo $toolTipTxt;
	
}
else
	echo "You must be in a competition to view example input/output.";
	
?>