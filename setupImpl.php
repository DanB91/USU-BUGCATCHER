<?php

//require_once 'Mode/Admin.php';


$nProbs = $_GET["numProbs"];
$pArr = $_GET["problems"];

$compN = $_GET["compN"];
$passwd = $_GET["passwd"];
$desc = $_GET["desc"];
$hidden = $_GET["hidden"];
$joinable = $_GET["joinable"];
$compTime = $_GET["CompTime"];
$codeCov = $_GET["codeCov"];
$inclCD = $_GET["inclCD"];
//$ADMIN = $_SESSION['adminObject'];


echo "Comp Name: " . $compN . "\n" . "passwd: " . $passwd . "\n" . "desc: " . $desc . "\n" . "hidden: " . $hidden . "\n" . "compT: " . $compTime;


//  $compData = array(
//                    "compName" => $compN,
//                    "password" => $passwd,
//                    "desciption" => $desc,
//                    "hidden" => $hidden,
//                    "comptime" => $compTime,
//                    "codecoverage" => $codeCov,
//                    "countdown" => $inclCD,
//                    "joinable"=>$joinable);
//
//$admin = new Admin($userN, "username");
//$admin->createCompetition($compData);
//$admin->addProblems($pArr);
//$compID = $admin->compID;
//
//setcookie('adminCompID',$compID, time() + 60*60*24*30);
 
?>
