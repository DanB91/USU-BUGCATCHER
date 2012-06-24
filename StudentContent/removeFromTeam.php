<?php
require_once "../header.php";
session_start();
$team = $_SESSION['teamObject'];
$memberID = $_POST['memberID'];

$team->removeUserByID($memberID);

?>
