
<?php

//The purpose of this code is to load the chat file that was built in instantMessaging.php and push the contents to the appropriate users.
//The code also loads in any hints or messages from the admin.


require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;

	
		$contents=file("../../Uploads/".$AdminUsername."/TempCompetition/Content.txt",FILE_IGNORE_NEW_LINES);//Open the file in an array
		
		$contentCount=count($contents);

		$arrayToReturn=array();


		//get remaining contents
		for($line=0 ;$line<$contentCount; $line++){
			$arrayToReturn = array_merge($arrayToReturn, explode("<!@!>",$contents[$line]));
			//explode seperates the array based on the delimeter <!@!>
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
		
		$arrayToReturn = json_encode($arrayToReturn);

		echo $arrayToReturn;//Echo back the arrayToReturn see student.js for more details.
?>



