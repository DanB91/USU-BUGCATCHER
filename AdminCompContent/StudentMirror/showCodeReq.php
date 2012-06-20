<?php
//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.

require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;
$problem = $_GET["problem"];

if(!file_exists("../../Uploads/${AdminUsername}/Problems/${problem}/${problem}Req.txt"))
{
  echo "Problem not available.";
  return;
}

$fileReq=fopen("../../Uploads/${AdminUsername}/Problems/${problem}/${problem}Req.txt", "r");

$problemTxt = '';

while( !feof($fileReq))//get file contents
{
  $problemTxt .= "<p>";
  $problemTxt .= fgets($fileReq);
  $problemTxt .= "</p>";
}

fclose($fileReq);
echo $problemTxt;
//echo "Didn't work";

?>