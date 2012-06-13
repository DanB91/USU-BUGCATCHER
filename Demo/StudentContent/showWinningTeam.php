<?php
	$comp = $_COOKIE['compID'];
	$useID = $_COOKIE['userID'];

if(isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '' && isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
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
		
		if($teamName != "")
		{
		
			$results = mysql_query("SELECT * FROM ${comp}teams ORDER BY bugsFound DESC,totaltimefound DESC");
		
			while($res = mysql_fetch_array($results))
			{
				switch($count)
				{
					case 0:
						$resultString .= "1st: " . $res['teamname'] . "<br>";
						break;
					case 1:
						$resultString .= "2nd: " . $res['teamname'] . "<br>";
						break;
					case 2:
						$resultString .= "3rd: " . $res['teamname'];
						break;
				}
				
				if(count == 2)
					break;
				$count++;
			}
			echo $resultString;
			mysql_close($con);
		}
		else
			echo 0;
		
}
else
	echo 0;


?>