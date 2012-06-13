<?php		  

	$teamN = $_GET['q'];
	$selectName=$_GET["selectName"];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$compID = strtolower($_COOKIE['compID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	$results = mysql_query("SELECT * FROM ${compID}students", $con);
	
	$team_String = '<select name="'.$selectName.'" id="'.$selectName.'" class="MStudentSelect" onchange="currentSelection(this, id)">';

	$team_String .= '<option>'. '------Select a Name------' .'</option>';
	$names = '';
	while($row = mysql_fetch_array($results))
	{
		if($row['onTeam'] == 0)
		{
		  $userN = $row['username'];
		  $results2 = mysql_query("SELECT * FROM accounts.students WHERE username = '${userN}'");
		  $row2 = mysql_fetch_array($results2);
		  
		  $fullName = $row2['lastname'] . ', ' . $row2['firstname'];
		  $NextOption = "<option> ${fullName} </option>";
		  $team_String .= $NextOption;
		}
	}
	$team_String .= '</select>';

	echo $team_String;
	mysql_close($con);
}
else
	echo "Error from loadStudentNames" . "<br/>" . "no compID cookie not yet set";
?>
