<?php		  
 
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{

	$compID = strtolower($_COOKIE['compID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	$results = mysql_query("SELECT * FROM ${compID}teams");
	$team_String = '<select name="MTeamSelect" id="MTeamSelect" size=10 onchange="loadNamesOfStudents(this)">';//the onchange function was temporarly changed from loadTeamInfo to showStudentInfo
	$names = '';
	while($row = mysql_fetch_array($results))
	{
	  if(strcmp($row['teamname'],"") != 0)//Removes a blank element
	  {
		$name = $row['teamname'];
		$NextOption = '<option>'.$name.'</option>';
		$team_String .= $NextOption;
	  }
	}
	$team_String .= '</select>';
	echo $team_String;
	mysql_close($con);
}
else
	echo "You must create a competition" . "<br />" . "before you can edit team information." . "<br /><br /><br /><br /><br /><br /><br /><br /><br />";
?>

