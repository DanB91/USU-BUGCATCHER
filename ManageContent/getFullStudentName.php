<?php

//The purpose of this code is to retrieve the students full name based on 
//the team name and the students position on the team.

$teamN   = $_GET['q'];
$studPos = $_GET['studName'];

if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')//If compeition has been created
{

	$adminCompID = strtolower($_COOKIE['adminCompID']);
	
    $con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	
	$results = mysql_query("SELECT * FROM ${adminCompID}teams WHERE teamname = '${teamN}'");
	$teamInfo = mysql_fetch_array($results);
	
	$member = '';
	
	switch($studPos)
	{
		case 'Stud1':
			$member = 'Member1name';
			break;
		case 'Stud2':
			$member = 'Member2name';
			break;
		case 'Stud3':
			$member = 'Member3name';
			break;
		default:
			echo "ERROR from getFullStudentName.php studPos invalid";
			
	}
	
    if($teamInfo["${member}"] != NULL)
    {
	  $accName = $teamInfo["${member}"];
	  $result = mysql_query("SELECT * FROM accounts.students WHERE username = '${accName}'");
	  $studentInfo = mysql_fetch_array($result);
	  $fullName = $studentInfo['lastname'] . ', ' . $studentInfo['firstname'];
	  echo $fullName;
    }
    else
	  echo '';

	mysql_close($con);
}
else
	echo "Cookies not set from getFullStudentName";

?>