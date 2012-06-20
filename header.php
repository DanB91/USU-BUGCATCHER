<?php
require_once dirname(__FILE__) ."/Models/Admin.php";
require_once dirname(__FILE__) ."/Models/Team.php";
require_once dirname(__FILE__) ."/Models/User.php";
require_once dirname(__FILE__) ."/Models/TeamInvite.php";
require_once dirname(__FILE__) ."/Models/Competition.php";
require_once dirname(__FILE__) ."/Models/Problem.php";
require_once dirname(__FILE__) ."/Models/Bug.php";
require_once dirname(__FILE__) ."/Models/Leaderboard.php";
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
