<?php
require_once "../header.php";
session_start();
$user = $_SESSION['userObject'];

if ($user != NULL) {
    $invites = $user->getTeamInvites();
    $html = '';
    foreach ($invites as $invite) {
        $inviteID = $invite->teaminviteid;
        $team = new Team($invite->teamid);
        $html .= "<option value='$inviteID' ondblclick='StartToMember(this.value);'>";
        $html .= $team->teamname;
        $html .= "</option>";
    }
    if (count($invites) != 0) {
        echo $html;
    } else {
        echo "<option disabled='disabled'>No invites pending.</option>";
    }
}
else
    echo "<option disabled='disabled'>You must be logged in to view.</option>";

?>
