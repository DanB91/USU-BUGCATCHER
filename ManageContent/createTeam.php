<?php	
	
//The purpose of this code is to create a team based on the name the admin has submitted.
//If a team already is exists, then the request is ignored.
//If a team is created, then all the necessary files are created as well such as a teamContent file.



if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')//If competition has been created
{

	$teamName = $_GET["MTeamName"];


	$adminCompID = strtolower($_COOKIE['adminCompID']);
	$adminCompIDUpper = $_COOKIE['adminCompID'];
	$con = mysql_connect("localhost","guest","");

	mysql_select_db("competition", $con);
	$sql = "INSERT INTO ${adminCompID}teams (teamname) VALUES ('${teamName}')";//Add the team to the database
	mysql_query($sql);
	
	$fileName = "../Competitions/${adminCompID}/".$adminCompIDUpper . $teamName . "Content" . ".txt";//Create the team content file
	$file = fopen($fileName,"w+");
	fclose($file);
	
	$results = mysql_query("SELECT * FROM ${adminCompID}teams");
	
	$team_String = '<select name="MTeamSelect" id="MTeamSelect" size=10 onchange="loadStudentInfo(this)">';//Start select
	$names = '';
	
	while($row = mysql_fetch_array($results))//Place all the team names in an option that will be displayed
	{
	  if(strcmp($row['teamname'],"") != 0)//Removes a blank element
	  {
		$name = $row['teamname'];
		$NextOption = '<option>'.$name.'</option>';
		$team_String .= $NextOption;
	  }
	}
	$team_String .= '</select>';//End select
	
	echo $team_String;
	mysql_close($con);
}
else
	echo "Please create a competition " . "<br / >" . "before creating a team" . "<br /><br /><br /><br /><br /><br /><br /><br /><br />";
?>