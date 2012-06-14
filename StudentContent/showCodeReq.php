<?php

//The purpose of this code is to show the student the requierments 
//for the code that they are debugging such as how to enter test cases 
//and a description of how the program functions.


$problem = $_POST["problem"];
$compID = $_COOKIE['compID'];
$probNum = $_POST['index'];
$NumProbsCR = 0;

if (isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '') {//If the competition has been created
    if (!file_exists("../Problems/${problem}/${problem}Req.txt")) {
        echo "Problem not available.";
        return;
    }

    $fileReq = fopen("../Problems/${problem}/${problem}Req.txt", "r");
    $fileComp = file("../Competitions/${compID}/${compID}.txt");
    $rest = $probNum;

    $comp = new Competition($compID);

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