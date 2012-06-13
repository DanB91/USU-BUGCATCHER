<?php		  

	//The purpose of this code is to place a student on a team so they can compete in a competition.
	//If a student has been placed on a team the student's name is removed from the list of students not on a team.
	//A student is on a team if the student's onteam column in the database is set to 1.
	//Once a spot has been filed that spot is grayed out and the remove student button becomes available. See admin.js for more details
	//This code is for the team management tab located on the admin side

$userN=$_GET["userN"];
$team=$_GET["team"];
$studNum = $_GET['studNum'];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If a competition has been created
{

	$compID = strtolower($_COOKIE['compID']);
	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}teams WHERE teamname = '".$team."'";

	$result = mysql_query($sql);
	$nullVal = NULL;

	$row = mysql_fetch_array($result);

	$memberName = '';
	$memberID = '';
	
	switch($studNum)
	{
		case 'Stud1':
			$memberName = 'Member1name';
			$memberID = 'Member1ID';
			break;
		case 'Stud2':
			$memberName = 'Member2name';
			$memberID = 'Member2ID';
			break;
		case 'Stud3':
			$memberName = 'Member3name';
			$memberID = 'Member3ID';
			break;
		default:
			echo "ERROR from placeStudentOnTeam.php studNum invalid";
			
	}
	
		if($row["${member}"] == NULL)//If the first student position on the team was selected
		{
			
			$studID = mysql_query("SELECT * FROM ${compID}students WHERE username = '${userN}'");
			$rowt = mysql_fetch_array($studID);
			$studID = $rowt['userID'];
			
			$temp = "UPDATE ${compID}teams SET ${memberID}='${studID}' WHERE teamname='${team}'";
			mysql_query($temp);
			
			$temp = "UPDATE ${compID}students SET onteam='1' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET teamName='${team}' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}teams SET ${memberName}='${userN}' WHERE teamname='${team}'";
			mysql_query($temp);
			
		}
		else
		{
			//Spot taken
		}
	mysql_close($con);
}
else
	echo"Cookies not set from placeStudentOnTeam";

?>