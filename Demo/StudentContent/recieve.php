
<?php
$compID = $_COOKIE['compID'];
$userID		= $_COOKIE['userID'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '' && isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')
{

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}students WHERE userID = '".$userID."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$onTeam = $row['onTeam'];
	$userName = $row['username'];
	
	if($onTeam == '1')
	{
	
		$teamName = $row['teamName'];
		$file=file("../Competitions/${compID}${teamName}Content.txt",FILE_IGNORE_NEW_LINES);

	
	

		$contentString = '';

		for($line=0;$line<count($file);$line++){

			$messageArr=explode("<!@!>",$file[$line]);
			$count = count($messageArr);

			for($i = 0; $i < $count; $i++)//Print array
			{
				$contentString .= $messageArr[$i]."<br>";
			}

		}
		$adminContent = file("../Competitions/${compID}Content.txt", FILE_IGNORE_NEW_LINES);
		
		for($line=0;$line<count($adminContent);$line++){

			$messageArr=explode("<!@!>",$adminContent[$line]);
			$count = count($messageArr);

			for($i = 0; $i < $count; $i++)//Print array
			{
				$contentString .= $messageArr[$i]."<br>";
			}

		}
		
		echo $contentString;
		mysql_close($con);
	}
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>



