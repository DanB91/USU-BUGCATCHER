<?php		  


	//The purpose of this code is to display all the students that are in a competition and not on a team.
	//This is what the admin will see when asigning teams.
	//This code is for the team management tab located on the admin side.

	$teamN = $_GET['q'];
	$selectName=$_GET["selectName"];

        
        
if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')//If competition has been creatd
{
	$adminCompID = strtolower($_COOKIE['adminCompID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	$results = mysql_query("SELECT * FROM ${adminCompID}students", $con);
	
	$team_String = '<select name="'.$selectName.'" id="'.$selectName.'" class="MStudentSelect" onchange="currentSelection(this, id)">';//Start the select

	$team_String .= '<option>'. '------Select a Name------' .'</option>';//The default option
	$names = '';
	while($row = mysql_fetch_array($results))
	{
		if($row['onTeam'] == 0)//If student is not on a team
		{
		  $userN = $row['username'];
		  $results2 = mysql_query("SELECT * FROM accounts.students WHERE username = '${userN}'");
		  $row2 = mysql_fetch_array($results2);
		  
		  $fullName = $row2['lastname'] . ', ' . $row2['firstname'];
		  $NextOption = "<option> ${fullName}  </option>";
		  $team_String .= $NextOption;
		}
	}
	$team_String .= '</select>';//End select

	echo $team_String;
	mysql_close($con);
}
else
	echo "Error from loadStudentNames" . "<br/>" . "no adminCompID cookie set";
?>
