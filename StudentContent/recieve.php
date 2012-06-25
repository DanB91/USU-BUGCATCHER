<?php

//The purpose of this code is to load the chat file that was built in instantMessaging.php and push the contents to the appropriate users.
//The code also loads in any hints or messages from the admin.
require_once "../header.php";

session_start();
$comp = $_SESSION['compObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];


if($comp->compid && $user->userid)
{
    //var_dump($team);
	if($team!=null)//If the student is on a team
	{	$arrayToReturn=array();
		try{
		    $team->refreshChats($comp);
		}
		catch(Exception $e){
		    echo $e;
		}
		$arrayToReturn=$team->getChats();
		if(count($arrayToReturn)==0)
		    $arrayToReturn[]="Nothing yet";
		$arrayToReturn = json_encode($arrayToReturn);
		echo $arrayToReturn;//Echo back the arrayToReturn see student.js for more details.
	}
	else{
		echo "You must be on a different team";
	}
}
else{
    echo "You must be logged in and part of a competition to recieve updates";
}

?>