<?php

require_once "../header.php";

session_start();
$inviteID = $_POST['inviteID'];
$invite = new TeamInvite($inviteID);
$team = new Team($invite->teamid);

if (isset($_SESSION['userObject']) && ($_SESSION['userObject'] != NULL)) {
//store team in session object.

        $invite->accept();
        $_SESSION['teamObject'] = $team;
        echo "1";
}
else echo "You must be logged in to join a team";
?>
