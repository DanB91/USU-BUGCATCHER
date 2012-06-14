<?php

//require_once 'Mode/Admin.php';


$nProbs = $_GET['numProbs'];
$pArr = $_GET['problems'];
//$compN = $_GET['compN'];
//$passwd = $_GET['passwd'];
//$desc = $_GET['desc'];
//$pState = $_GET['pState'];
//$hidden = $_GET['hidden'];
//$joinable = $_GET['joinable'];
$compTime = $_GET["CompTime"];
$codeCov = $_GET['codeCov'];
$inclCD = $_GET['inclCD'];


  $compData = array("compID" => 'NULL', 
                    "compName" => $compN,
                    "password" => $passwd,
                    "desciption" => $desc,
                    "pausestate" => 'NULL',
                    "hidden" => $hidden,
                    "userid" => $_COOKIE['adminUserID'],
                    "comptime" => $compTime,
                    "codecoverage" => $codeCov,
                    "countdown" => $inclCD,
                    "joinable"=>$joinable);

$admin = new Admin($userN, "username");
$admin->createCompetition($compData);
//$admin->addProblems($pArr);
$compID = $admin->compID;

 setcookie('adminCompID',$compID, time() + 60*60*24*30);
 
?>
