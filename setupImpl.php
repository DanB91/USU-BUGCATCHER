<?php

function exception_handler($exception) {
  echo "Uncaught exception: " , $exception->getMessage(), "\n";
}

set_exception_handler('exception_handler');

function error_handler($errno, $err) {
  echo "Uncaught err: " , $err, "\n";
}

set_error_handler('error_handler');

require_once "Models/Admin.php";

//session_start();

$nProbs = $_GET["numProbs"];
$pArr = $_GET["problems"];

$compN = $_GET["compN"];
$passwd = $_GET["passwd"];
$desc = $_GET["desc"];
$hidden = $_GET["hidden"];
//$joinable = $_GET["joinable"];
$compTime = $_GET["CompTime"];
$codeCov = $_GET["codeCov"];
$inclCD = $_GET["inclCD"];
//$admin = $_SESSION['adminObject'];
try
{
   $admin = new Admin(3); 
}
catch(Exception $e)
{
    echo $e->getMessage();
    
}

echo "Comp Name: " . $compN . "\n" . "passwd: " . $passwd . "\n" . "desc: " . $desc . "\n" . "hidden: " . $hidden . "\n" . "compT: " . $compTime;


  $compData = array(
                    "compname" => $compN,
                    "password" => $passwd,
                    "description" => $desc,
                    "hidden" => $hidden,
                    "duration" => $compTime,
                    "codecoverage" => 0,
                    "countdown" => $inclCD);


try {
    
$admin->createCompetition($compData);
}
catch(Exception $e){ echo $e;  }



 
?>
