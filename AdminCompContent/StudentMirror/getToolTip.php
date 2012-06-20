<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.


$problem = $_GET["problem"];
require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;

if(!file_exists(".../Uploads/${AdminUsername}/Problems/${problem}/${problem}Ex.txt"))
{
  echo "No Example input available";
  return;
}
    
$fileExamp=fopen(".../Uploads/${AdminUsername}/Problems/${problem}/${problem}Ex.txt", "r");
$toolTipTxt .= fgets($fileExamp);
fclose($fileExamp);
echo $toolTipTxt;
	
?>