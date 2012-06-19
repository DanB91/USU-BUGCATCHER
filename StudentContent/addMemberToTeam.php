<?php
require_once "Team.php";
require_once "User.php";
require_once "Competition.php";

$teamID = $_POST['teamID'];
$team = new Team($teamID);

$user = $_SESSION['userObject'];
//store team in session object.
$_SESSION['teamObject']=$team;

if($user->addUserToTeam($team))
    echo "1";
else
    echo "Failed to add user to team. Please try again."

?>
