<?php
//This code is ran every several seconds and checks to see if the number of bugs the team has found has changed.
//The number of bugs found is returned and updated on the student side.
//See student.js for more details

if(isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')//If the user is correctly loged in
{
	$comp = $_COOKIE['compID'];
	$useID = $_COOKIE['userID'];
	$comp = strtolower($comp);
	
		$con = mysql_connect('localhost', 'guest', '');
		mysql_select_db("competition", $con);
		$sql="SELECT * FROM ${comp}students WHERE userID ='${useID}'";
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		$teamName = $row['teamName'];
		
		if($teamName != "")//If on a team
		{
		
			$sql="SELECT * FROM ${comp}Teams WHERE teamName ='${teamName}'";
			$result =  mysql_query($sql);
		
			$res = mysql_fetch_array($result);
				echo $res['bugsFound'];
			
			mysql_close($con);
		}
		else
			echo 0;
		
}
else
	echo 0;


?>