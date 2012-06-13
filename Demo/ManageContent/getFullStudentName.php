<?php

//The purpose of this code is to display a student's full name based on thier team.

$teamN   = $_GET['q'];
$studNum = $_GET['studName'];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{

	$compID = strtolower($_COOKIE['compID']);
	
    $con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);
	
	$results = mysql_query("SELECT * FROM ${compID}teams WHERE teamname = '${teamN}'");
	$teamInfo = mysql_fetch_array($results);
	
	$member = '';
	
	switch($studNum)
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
			echo "ERROR from getFullStudentName.php studNum invalid";
			
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