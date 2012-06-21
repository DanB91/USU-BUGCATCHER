<?php

set_error_handler('error_handler');
require_once 'Models/Problem.php';
require_once "Models/Admin.php";

session_start();

$nProbs = $_GET["numProbs"];
$pArr = $_GET["problems"];
$problemArr = array();

$compN = $_GET["compN"];
$passwd = $_GET["passwd"];
$desc = $_GET["desc"];
$hidden = $_GET["hidden"];
//$joinable = $_GET["joinable"];
$compTime = $_GET["CompTime"];
$codeCov = $_GET["codeCov"];
$inclCD = $_GET["inclCD"];
$admin = $_SESSION['adminObject'];



    
$pieces = explode(",", $_GET['problems'][0]);
foreach($pieces as $value){
         $problem = new Problem($value,"problemname");
         array_push($problemArr,$problem);
}


  $compData = array(
                    "compname" => $compN,
                    "password" => $passwd,
                    "description" => $desc,
                    "hidden" => $hidden,
                    "duration" => $compTime,
                    "codecoverage" => 0,
                    "countdown" => $inclCD
                   );


    setcookie("compN", $compN, time() + 60 * 60 * 24 * 30);//  $_SESSION['compN'] = $compN;
    $admin->createCompetition($compData, $problemArr);

?>
