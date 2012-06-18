<?php
require_once TeamInvite.php;

$user = $_SESSION['userObject'];
$invites = $user->getTeamInvites();
$html = '';

foreach($invites as $invite){
    $teamID = $invite->teamid;
    $team = new Team(teamid);
    $html += "<option value=\'${teamID}\' ondblclick=\'StartToMember(this.value);\'>";
    $html += $team->teamname;
    $html += "</option>";
}

echo $html;

?>
