<?php		  

//The purpose of this code is to remove a student that has been placed on a team
//If a student is on a team, then that student's onteam column in the database is 1
//A student is removed from a team by nulling out that students position on the team
//and setting that student's onteam column back to NULL
//This code is part of team management which can be found under the team management tab on the admin side

$userN=$_GET["userN"];
$team=$_GET["team"];
$studNum = $_GET['studNum'];
$nullValue = NULL;
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
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
			echo "ERROR from removeStudentFromTeam.php studNum invalid";
			
	}

		if($row["${memberName}"] != NULL)
		{
			$temp = "UPDATE ${compID}teams SET ${memberID}='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET onteam='0' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}teams SET ${memberName}='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET teamName='${nullValue}' WHERE username='${userN}'";
			mysql_query($temp);
		}
		else
		{
			//Student already removed
		}
	mysql_close($con);
}
else
	echo"Cookies not set from placeStudentOnTeam";

?>