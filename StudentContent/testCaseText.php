<?php

include 'simple_html_dom.php';
require_once "../header.php";
session_start();


//set_error_handler('error');


$testInput = mysql_real_escape_string(trim($_POST["testInput"])); //sanitizes input
$testOutput = mysql_real_escape_string(trim($_POST["testOutput"])); //sanitizes output
$isCoverage = $_POST["codeCov"]; //boolean for coverage
$problemName = $_POST["problemNum"];
$comp = $_SESSION['compObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
//Wrote by Tara Noble
//Edited by Quentin Mayo


//input checking
if ($comp==null) {trigger_error('You must be part of the competion to submit bugs');}
elseif ($team==null) {trigger_error("You must be on a team to submit a bug");}
elseif ($user==null) { trigger_error("You must be logged to submit a bug");}
elseif ($problemName==null) { trigger_error("Unkown problem");}
//* Uncomment Line
//elseif (count(preg_split('/[\n\r\t\s]/', $testInput, NULL, PREG_SPLIT_NO_EMPTY)) == 0 || count(preg_split('/[\n\r\t\s]/', $testOutput, NULL, PREG_SPLIT_NO_EMPTY)) == 0) {trigger_error('Please enter an expected input and output');} 
elseif ($problemName == '') {trigger_error('Please select a problem');}


//chdir('../..');
$prob = new Problem($problemName,"problemname");

//* Remove 
$tempFix = '../Problems/';
if(!file_exists($tempFix.$prob->oraclepath)){trigger_error("Can't find Oracle, contact administrative");}

$foundBug = false;
$alreadyFoundBug = false;
$bugid ="";



$oOutput = trim(shell_exec("java -jar $tempFix"."$prob->oraclepath $testInput"));


foreach($prob->getBugs() as $value){
    $bOutput = trim(shell_exec("java -jar $tempFix". "$value->abpath $testInput"));
    
     if ($bOutput != $oOutput) {
         echo "$value->bugid,$comp->compid,$team->teamid";
         if ($team->hasFoundBugInCompetition($value, $comp)) {
             $alreadyFoundBug = true;
             continue;
         }
         else{
             $foundBug = true;
             $bugid = $value->bugid;
             break;
         }
         
     }
    
}
if($foundBug &&  $alreadyFoundBug){
    echo "Found Newer Bug";
}
elseif($foundBug &&  !$alreadyFoundBug){
    echo "Found Bug";
}
elseif(!$foundBug &&  $alreadyFoundBug){
    echo "Found alreay exist";
}
else{
     echo "This is impossible";   
}


?>
