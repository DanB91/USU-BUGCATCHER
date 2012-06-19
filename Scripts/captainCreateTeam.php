<?php
$user = $_SESSION['userObject'];
$teamName = $_POST['teamName'];
$invite1 = $_POST['inviteOne'];
$invite2 = $_POST['inviteTwo'];

if (isset($_SESSION['userObject']) && ($user != NULL)) {

    $registerData = array("teamname" => $teamName, "teamleaderid" => $user->userid);
    try {
        $team = Team::createTeam($registerData);
        $_SESSION['teamObject'] = $team;
        echo 1;
    } catch (ModelAlreadyExistsException $e) {
        echo "Team name already exists. Please choose a new team name.";
    }
    
    
    
}
?>
