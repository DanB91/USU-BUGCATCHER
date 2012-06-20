<?php

//The purpose of this code is to write a custom hint to the competition content file


$adminCompID	= $_COOKIE['adminCompID'];

if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')//If competition is created
{
	$customHint ="<font color='#551D00'> [Hint] " . $_GET["customHint"] . "</font>";//Color the hints a different color
	
	$file=fopen("../Competitions/${adminCompID}/${adminCompID}Content.txt","a");
	//if(!isLineInFile(".LOG", "../Competitions/${adminCompID}/${adminCompID}Content.txt"))
		//	fwrite($file, ".LOG\n");
	
	//put in time stamp
	date_default_timezone_set('America/Denver');
   	fwrite($file, (((date('H')*60)+date('i'))*60+date('s'))."<!@!>");
					
	fwrite($file, $customHint);
	fwrite($file, "<!@!>");//Write the delemeter to the file
	fclose($file);

}
?>