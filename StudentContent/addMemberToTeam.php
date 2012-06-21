<?php

require_once "../header.php";

session_start();
$inviteID = $_POST['inviteID'];
$invite = new TeamInvite($inviteID);

if (isset($_SESSION['userObject']) && ($_SESSION['userObject'] != NULL)) {


        $invite->accept();
        $team = new Team($invite->teamid);
        $_SESSION['teamObject'] = $team;
        echo "1";
}
else echo "You must be logged in to join a team";
?>
