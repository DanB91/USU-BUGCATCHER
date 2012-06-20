<?php

require_once dirname(__FILE__) . "/../header.php";
session_start();
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$isCaptain = $_POST['isCaptain'];

if ($user != NULL && $team != NULL) {
    $memberInfo = '';
    if ($isCaptain) {
        $members = $team->getUsers();
        var_dump($team->userids);
        foreach ($members as $member) {
            if ($member->userid != $user->userid)
                $memberInfo .= $member->username . ",";
        }
    } else {
        $leader = $team->getTeamLeader();
        $leaderID = $leader->userid;
        $userID = $user->userid;
        $memberInfo .= $captain->username . ",";
        $memberInfo .= $captain->firstname . ",";
        $memberInfo .= $captain->lastname . ",";

        $members = $team->getUsers();
        foreach ($members as $member) {
            //if the member is not the current user or the captain, return their information
            if (($member->userid != $leaderID) && $member->userid != $userID) {
                $memberInfo .= $member->username . ",";
                $memberInfo .= $member->firstname . ",";
                $memberInfo .= $member->lastname . ",";
            }
        }
    }
    echo $memberInfo;
}
else
    echo "You must be logged in on a team to view this information."
?>
