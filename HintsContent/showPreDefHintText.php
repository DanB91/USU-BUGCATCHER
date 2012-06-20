<?php

$problemSelected = $_GET['problemSelected'];
$hintSelected = $_GET['hintSelected'];

$fileCust=file("../../USU-BUGCATCHER/HintsContent/Hints/PreDefHints/${problemSelected}.txt",FILE_IGNORE_NEW_LINES);

$hintsSoFar = 0;//Used to count the hints since it is possible that hints may span multiple lines
$foundHint = false;


for($line=0;$line<count($fileCust);$line++){

	$messageArr=explode("<!@!>",$fileCust[$line]);
	$count = count($messageArr);

	for($i = 0; $i < $count - 1; $i++)//Print array
	{
		if($hintsSoFar == $hintSelected - 1)//When we get to the correct hint print
		{
			echo $messageArr[$i];//Print the hint
			$foundHint = true;
			$hintsSoFar++;//Used to eliminate the event that a hint may be printed twice
			break;
		}
		
		$hintsSoFar++;
	}
	if($foundHint)
	{
   // echo "dasdsd";
		break;
    } 

}


?>