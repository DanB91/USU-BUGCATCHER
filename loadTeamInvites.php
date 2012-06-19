<?php
require_once TeamInvite.php;

$user = $_SESSION['userObject'];
$invites = $user->getTeamInvites();
$html = '';

foreach($invites as $invite){
    $inviteID = $invite->teaminviteid;
    $team = new Team($invite->teamid);
    $html += "<option value=\'${inviteID}\' ondblclick=\'StartToMember(this.value);\'>";
    $html += ($team->teamname);
    $html += "</option>";
}

echo $html;

?>
