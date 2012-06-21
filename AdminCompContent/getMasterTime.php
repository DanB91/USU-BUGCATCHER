
<?php

require_once '../header.php';
include '../timer.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];


echo getRemainingTime($admin->getCompetitionByCompName($compN));

?>


