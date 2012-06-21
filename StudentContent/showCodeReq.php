<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.

require_once "../timer.php";
require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];

$problem = $_POST["problem"];
$probNum = $_POST['index'];
//$NumProbsCR = 0;

if ($comp!=null) {//If the competition has been created
    if (!file_exists("../Problems/${problem}/${problem}Req.txt")) {
        echo "Problem not available.";
        return;
    }

    $fileReq = fopen("../Problems/${problem}/${problem}Req.txt", "r");
    //$fileComp = file("../Competitions/".$comp->compid."/".$comp->compid.".txt");
    //$rest = $probNum;

    if (!$comp->isPaused()) {//Displays the number of problems specified by the admin
        $problemTxt = '';
        while (!feof($fileReq)) {//get file contents
            $problemTxt .= "<p>";
            $problemTxt .= fgets($fileReq);
            $problemTxt .= "</p>";
        }
        fclose($fileReq);
        echo $problemTxt;
    }else{
    echo "Requirements will be displayed here when competition is in progress.";
    }
}
else
    echo "You must be in a competition to view code and requirements.";
?>