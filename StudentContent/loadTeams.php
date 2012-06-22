<?php
require_once "../header.php";
session_start();
$user = $_SESSION['userObject'];

if ($user != NULL) {
    $teams = $user->getUsersTeams();
    $html = '';
    foreach ($teams as $team) {
        if ($team->getTeamLeader() == $user->userid)
            $html .= "<option value='".$team->teamid."' ondblclick='RejoinTeam(this.value);' class='boldedOpt'>";
        else
            $html .= "<option value='".$team->teamid."' ondblclick='RejoinTeam(this.value);'>";
        $html .= $team->teamname;
        $html .= "</option>";
    }
    if (count($teams) != 0) {
        echo $html;
    } else {
        echo "<option disabled='disabled'>No invites pending.</option>";
    }
}
else
    echo "<option disabled='disabled'>You must be logged in to view.</option>";
?>
