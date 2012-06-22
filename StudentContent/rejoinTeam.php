<?php
require_once "../header.php";
session_start();
$teamID = $_POST['teamID'];
$team = new Team($teamID);

if (isset($_SESSION['userObject']) && ($_SESSION['userObject'] != NULL)) {
        $_SESSION['teamObject'] = $team;
        if ($team->getTeamLeader() == $_SESSION['userObject']->userid)
            echo "2";
        else
            echo "1";
}
else echo "You must be logged in to join a team";
?>
