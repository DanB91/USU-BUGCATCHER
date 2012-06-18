<?php
require_once "Team.php";
require_once "User.php";
require_once "Competition.php";

$teamID = $_POST['teamID'];
$team = new Team($teamID);

$user = $_SESSION['userObject'];



?>
