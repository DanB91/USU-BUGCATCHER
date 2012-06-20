<?php
require_once "../header.php";
session_start();

$comp = $_SESSION['compObject'];
$problems=$comp->getProblems();

$probContent[0] = count($problems);

foreach($problems as $problem)
{
  array_push($probContent, $problem->problemname);
}

$r = json_encode($probContent);
echo $r;

?>
