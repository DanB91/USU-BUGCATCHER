<?php

//The purpose of this code is to completely delete a team from a competition.
//If there are students on the team that is to be removed, then the students 
//are first removed and their onteam column in the database is set to null.
//When a team is removed the team is completely removed from the database and the team name can be used again.
//NOTE: There is currently no button on the team management tab to remove a team.

$team=$_GET["team"];
$nullValue = NULL;

if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')
{

	$adminCompID = strtolower($_COOKIE['adminCompID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${adminCompID}teams WHERE teamname = '".$team."'";

	$result = mysql_query($sql);

	$count = 1;
	
	
	while($row = mysql_fetch_array($result)){//Remove all students from team first

		$memberNameToRemove = 'Member'."${count}".'name';
		$memberIDToRemove = 'Member'."${count}".'ID';
		
		if($row["${memberNameToRemove}"] != NULL)
		{
			$temp = "UPDATE ${adminCompID}teams SET ${memberIDToRemove}='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${adminCompID}students SET onteam='0' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${adminCompID}teams SET ${memberNameToRemove}='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${adminCompID}students SET teamName='${nullValue}' WHERE username='${userN}'";
			mysql_query($temp);
		}
		
		$count++;
		
	}
	
	mysql_query("DELETE FROM ${adminCompID}teams WHERE teamname='${team}'");//Remove team
	
	mysql_close($con);
}
else
	echo"Cookies not set from removeTeam.php";

?>