
<?php

//The purpose of this code is to load the chat file that was built in instantMessaging.php and push the contents to the appropriate users.
//The code also loads in any hints or messages from the admin.


$compID = $_COOKIE['compID'];
$userID		= $_COOKIE['userID'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '' && isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')//If the competition has been created and the user is correctly loged in
{

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}students WHERE userID = '".$userID."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$onTeam = $row['onTeam'];
	$userName = $row['username'];
	
	if($onTeam == '1')//If the student is on a team
	{
	
		$teamName = $row['teamName'];
		$file=file("../Competitions/${compID}/${compID}${teamName}Content.txt",FILE_IGNORE_NEW_LINES);//Open the file in an array

		$contentString = '';//Used to hold the contesnts of the chat file

		for($line=0;$line<count($file);$line++){

			$messageArr=explode("<!@!>",$file[$line]);//Seperate the chat file in to pieces by using "<!@!>" as a delimiter
			$count = count($messageArr);

			for($i = 0; $i < $count; $i++)//Store the array in contentString
			{
				$contentString .= $messageArr[$i]."<br>";
			}

		}
		
		//The following bit code is used to append any hints or messages from the admin to contentString before it is returned.
		//Note that all admin messages or hints will be displayed at the bottom of the chat box
		$adminContent = file("../Competitions/${compID}/${compID}Content.txt", FILE_IGNORE_NEW_LINES);
		
		for($line=0;$line<count($adminContent);$line++){

			$messageArr=explode("<!@!>",$adminContent[$line]);//Seperate the array based on the delimeter <!@!>
			$count = count($messageArr);

			for($i = 0; $i < $count; $i++)//Print array
			{
				$contentString .= $messageArr[$i]."<br>";
			}

		}
		
		echo $contentString;//Echo back the contentString see student.js for more details.
		mysql_close($con);
	}
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>



