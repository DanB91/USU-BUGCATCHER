<?php

//The purpose of this code is to display the top three teams
//and their place in the competition.
//The teams are sorted based on bugs found and if two teams have the same 
//number of bugs the tie is resolved based on total time of bugs found.
//For example if a team finds a bug at 60 mins, then 60 mins will be added to time of bugs found. 
//The team with the most time and or most bugs will be declared the winning team.
//See Student.js for more details

$comp = $_SESSION['competitionObject'];
$user = $_SESSION['userObject'];
$userID = $user->userID;

if(isset($_COOKIE["user"]) && $_COOKIE["user"] != NULL && isset($_COOKIE["competitionObject"]) && $_COOKIE["compID"] != '')//if the competition has been created and the user is loged in correctly
{
	$comp = strtolower($comp);
	$count = 0;
	$resultString = '';
		
		$con = mysql_connect('localhost', 'guest', '');
		mysql_select_db("competition", $con);
		$sql="SELECT * FROM ${comp}students WHERE userID ='${useID}'";
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		$teamName = $row['teamName'];
		
		if($teamName != "")//If on a team
		{
		
			$results = mysql_query("SELECT * FROM ${comp}teams ORDER BY bugsFound DESC,totaltimefound DESC LIMIT 3");
		
			while($res = mysql_fetch_array($results))
			{
			$bugsFound = $res['bugsFound'];
				switch($count)
				{
					case 0:
						$resultString .= "1st: " . $res['teamname'];
						break;
					case 1:
						$resultString .= "2nd: " . $res['teamname'];
						break;
					case 2:
						$resultString .= "3rd: " . $res['teamname'];
						break;
				}
				
				if ($bugsFound == 1)
					$resultString .= ", 1 bug found <br>";
				else if ($bugsFound > 1)
					$resultString .= ", " . $bugsFound . " bugs found <br>";
				else 
					$resultString .= "<br>";
					
				if(count == 2)
					break;
				$count++;
			}
			echo $resultString;
			mysql_close($con);
		}
		else{
                    
                    echo "Top three teams will be displayed here";
                }
                    
		
}
else
	echo 0;


?>
