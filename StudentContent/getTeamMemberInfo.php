<?php

require_once dirname(__FILE__) . "/../header.php";
session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$team->update();
$isCaptain = $_POST['isCaptain'];

if ($user != NULL && $team != NULL) {
    $memberInfo = '';
    if ($isCaptain == "true") {
        $members = $team->getUsers();
        if (count($members) == 0)
            echo "<p>None logged in</p>";
        foreach ($members as $member) {
            if ($member->userid != $user->userid)
                $memberInfo .= "<p>" . $member->username . "</p>";
        }
    } else {
        $members = $team->getUsers();
        if (count($members) == 0)
            echo "<p>None logged in</p>";
        else {
            $leaderID = $team->getTeamLeader();
            $leader = new User($leaderID);
            $userID = $user->userid;
            $memberInfo .= "<p>Team Leader: ";
            $memberInfo .= $captain->username . "</p>";


            foreach ($members as $member) {
                //if the member is not the current user or the captain, return their information
                if (($member->userid != $leaderID) && $member->userid != $userID) {
                    $memberInfo .= "<p>" . $member->username . "</p>";
                }
            }
        }
    }

    echo $memberInfo;
}
else
    echo "You must be logged in on a team to view this information."
?>
