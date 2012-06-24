<?php

require_once dirname(__FILE__) . "/../header.php";
session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$team->update();
$isCaptain = $_POST['isCaptain'];

if ($user != NULL && $team != NULL) {
    $memberInfo = '';
    //code for captain (includes ability to remove)
    if ($isCaptain == "true") {
        $members = $team->getUsers();
        if (count($members) <= 1)
            echo "<p>None logged in</p>";
        else {
            foreach ($members as $member) {
                if ($member->userid != $user->userid) {
                    $memberInfo .= "<p>" . $member->username;
                    $memberInfo .= "<span onclick='removeFromTeam(" . $member->userid . ");'> (remove) </span></p>";
                }
            }
        }
        //code for other member (specifies team leader)
    } else {
        $members = $team->getUsers();
        $leaderID = $team->getTeamLeader();
        $leader = new User($leaderID);
        $userID = $user->userid;
        $memberInfo .= "<p>Team Leader: ";
        $memberInfo .= $leader->username . "</p>";


        foreach ($members as $member) {
            //if the member is not the current user or the captain, return their information
            if (($member->userid != $leaderID) && $member->userid != $userID) {
                $memberInfo .= "<p>" . $member->username . "</p>";
            }
        }
    }

    echo $memberInfo;
}
else
    echo "You must be logged in on a team to view this information."
?>
