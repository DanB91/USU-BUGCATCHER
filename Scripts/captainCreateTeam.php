<?php
$user = $_SESSION['userObject'];
$teamName = $_POST['teamName'];
$invite1 = $_POST['inviteOne'];
$invite2 = $_POST['inviteTwo'];
$isNewTeam = $_POST['newTeam'];


if (isset($_SESSION['userObject']) && ($user != NULL)) {
    try {
      //check if a new team has been created
      if($isNewTeam){
        $registerData = array("teamname" => $teamName, "teamleaderid" => $user->userid);
        $team = Team::createTeam($registerData);
        $_SESSION['teamObject'] = $team;
      } else $team = $_SESSION['teamObject'];
      
      //then send send invites to users
        if ($invite1 != ''){
            $invitee1 = new User($invite1, "username");
            $user->sendTeamInviteToUser($team, $invitee1);
        }
        if ($invite2 != ''){
            $invitee2 = new User($invite1, "username");
            $user->sendTeamInviteToUser($team, $invitee2);           
        }
        echo 1;
    } catch (ModelAlreadyExistsException $e) {
        echo "Team name already exists. Please choose a new team name.";
    }
    
    
    
}
?>
