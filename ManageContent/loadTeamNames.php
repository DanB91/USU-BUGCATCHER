<?php		  
 
 //The purpose of this code is to display the team names that have already been created so the admin can modify the team.
 //See removeStudentFromTeam.php for more details.
require_once '../header.php';
include '../timer.php';
session_start();

$admin = $_SESSION['adminObject'];
$compN = $_COOKIE['compN'];
 
 
if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')//If a competition has been created.
{
        $teams = $admin->getCompetitionByCompName($compN)->getTeams();
       
	$team_name_string = '<select name="MTeamSelect" id="MTeamSelect" size=10 onchange="loadStudentInfo(this)">';//Start select
	
        for($i = 0; $i < count($teams); $i++)
        {
            $name = $teams[$i]->teamname;
            $team_name_string .= '<option>'.$name.'</option>';//Add option containing a team name
        }
	$team_name_string .= '</select>';//End select
	echo $team_name_string;
	
}
else
	echo "You must create a competition" . "<br />" . "before you can edit team information." . "<br /><br /><br /><br /><br /><br /><br /><br /><br />";
?>

