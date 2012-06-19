<?php

require_once "Team.php";
require_once "User.php";
require_once "TeamInvite.php";
require_once "Competition.php";

$inviteID = $_POST['inviteID'];
$invite = new Invite($inviteID);
$team = new Team($invite->teamid);

$user = $_SESSION['userObject'];

if (isset($_SESSION['userObject']) && ($_SESSION['userObject'] != NULL)) {
//store team in session object.

    if ($user->addUserToTeam($team)) {
        $invite->accept();
        $_SESSION['teamObject'] = $team;
        echo "1";
    }
    else
        echo "Failed to add user to team. Please try again.";
}
?>
