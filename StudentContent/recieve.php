
<?php

//The purpose of this code is to load the chat file that was built in instantMessaging.php and push the contents to the appropriate users.
//The code also loads in any hints or messages from the admin.
//require_once "../header.php";
 
session_start();
$comp = $_SESSION['compObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];


if($comp['compid'] && $user['userid'])
{
	if($team['teamid'])//If the student is on a team
	{
		/*$teamName = $row['teamName'];
		$contents=file("../Competitions/${compID}/${compID}${teamName}Content.txt",FILE_IGNORE_NEW_LINES);//Open the file in an array
		$hints = file("../Competitions/${compID}/${compID}Content.txt", FILE_IGNORE_NEW_LINES);//Open the file in an array
		
		$contentCount=count($contents);
		$hintCount=count($hints);

		$arrayToReturn=array();


		//get remaining contents
		for($line=0 ;$line<$contentCount; $line++){
			$arrayToReturn = array_merge($arrayToReturn, explode("<!@!>",$contents[$line]));
			//explode seperates the array based on the delimeter <!@!>
		}
		//if not all hints were used, put in the rest
		for($line=0 ;$line<$hintCount; $line++){
			$arrayToReturn= array_merge($arrayToReturn, explode("<!@!>",$hints[$line]));
		}
		date_default_timezone_set('America/Denver');
   		$date=((date('H')*60)+date('i'))*60+date('s');
		
		//append currentServerTime to end of array
		array_splice($arrayToReturn, count($arrayToReturn)-1, 0, $date);

		for($i=0; $i<count($arrayToReturn);){
				if($arrayToReturn[$i]=="")
					array_splice($arrayToReturn, $i, 1);
				else
					$i++;
		}
		*/
	    echo "here";
		$arrayToReturn=array();
		$arrayToReturn[]="Nothing yet";
		$arrayToReturn = json_encode($arrayToReturn);
		
		echo $arrayToReturn;//Echo back the arrayToReturn see student.js for more details.
		//mysql_close($con);
	}
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>



