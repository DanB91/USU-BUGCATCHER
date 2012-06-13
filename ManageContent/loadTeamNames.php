<?php		  
 
 //The purpose of this code is to display the team names that have already been created so the admin can modify the team.
 //See removeStudentFromTeam.php for more details.
 
 
if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')//If a competition has been created.
{

	$adminCompID = strtolower($_COOKIE['adminCompID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	
	if($results = mysql_query("SELECT * FROM ${adminCompID}teams"))//Used in the event that the competition cannot be found but the cookies have been set
	{
		;//Success
	}
	else
		die("Competition not found. Please create another.");
		
	$team_String = '<select name="MTeamSelect" id="MTeamSelect" size=10 onchange="loadStudentInfo(this)">';//Start select
	$names = '';
	while($row = mysql_fetch_array($results))
	{
	  if(strcmp($row['teamname'],"") != 0)//Removes a blank element
	  {
		$name = $row['teamname'];
		$NextOption = '<option>'.$name.'</option>';//Add option containing a team name
		$team_String .= $NextOption;
	  }
	}
	$team_String .= '</select>';//End select
	echo $team_String;
	mysql_close($con);
}
else
	echo "You must create a competition" . "<br />" . "before you can edit team information." . "<br /><br /><br /><br /><br /><br /><br /><br /><br />";
?>

