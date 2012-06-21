<?php

set_error_handler('error_handler');

require_once "Models/Admin.php";

session_start();

$nProbs = $_GET["numProbs"];
$pArr = $_GET["problems"];
$problemArr = array();

$compN = $_GET["compN"];
$passwd = $_GET["passwd"];
$desc = $_GET["desc"];
$hidden = $_GET["hidden"];
$joinable = $_GET["joinable"];
$compTime = $_GET["CompTime"];
$codeCov = $_GET["codeCov"];
$inclCD = $_GET["inclCD"];
$admin = $_SESSION['adminObject'];



     $myArray = $_REQUEST['php_array'];
    print_r ($myArray);


  $compData = array(
                    "compname" => $compN,
                    "password" => $passwd,
                    "description" => $desc,
                    "hidden" => $hidden,
                    "duration" => $compTime,
                    "codecoverage" => 0,
                    "countdown" => $inclCD
                   );


//try {
    setcookie("compN", $compN, time() + 60 * 60 * 24 * 30);//  $_SESSION['compN'] = $compN;
    
//    foreach($pArr as $p)
//    {
//        try
//        {
//            
//         array_push($problemArr, new Problem($p, "problemname"));
//        }
//        catch(BugCatcherException $e) { echo $e; } 
//    }
//    var_dump($problemArr);
    $admin->createCompetition($compData, $problemArr);
//}
//catch(Exception $e){ echo $e; }


//echo "Comp Name: " . $compN . "\n" . "passwd: " . $passwd . "\n" . "desc: " . $desc . "\n" . "hidden: " . $hidden . "\n" . "compT: " . $compTime;
 
?>
