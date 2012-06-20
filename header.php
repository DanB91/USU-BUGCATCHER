<?php
require_once "Models/Admin.php";
require_once "Models/Team.php";
require_once "Models/User.php";
require_once "Models/TeamInvite.php";
require_once "Models/Competition.php";
require_once "Models/Problem.php";
require_once "Models/Bug.php";
//require_once "Models/Leaderboard.php";
header('Content-type: text/html');


function exceptionHandler($exception) {
  echo "Uncaught exception: " , $exception->getMessage(), "\n";
  die();
}

set_exception_handler('exceptionHandler');

function errorHandler($errNo, $errStr)
{
  echo "Error: " , "[$errNo] ", $errStr, "\n";
  die();
}

set_error_handler('errorHandler');


?>
