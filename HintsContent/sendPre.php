<?php

	$problemSelected	= $_GET["problemSelected"];
	$hintSlected 		= $_GET['hintSlected'];
	$adminCompID	        = $_COOKIE['adminCompID'];
	
if($hintSlected != '')
{
	if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')
	{

		$file=fopen("../Competitions/${adminCompID}/${adminCompID}Content.txt","a");
		$fileCust=file("C:/DropBox/htdocs/NewDesign/HintsContent/Hints/PreDefHints/${problemSelected}.txt",FILE_IGNORE_NEW_LINES);
		
		$hintsSoFar = 0;//Used to count the hints since it is possible that hints may span multiple lines
		$foundHint = false;
		
		for($line=0;$line<count($fileCust);$line++){

		$messageArr=explode("<!@!>",$fileCust[$line]);
		$count = count($messageArr);

			for($i = 0; $i < $count - 1; $i++)//Print array
			{
				if($hintsSoFar == $hintSlected - 1)//When we get to the correct hint print
				{
					fwrite($file, "<font color='#551D00'> [Hint] ". $problemSelected . ".<br>");
					fwrite($file, $messageArr[$i]);
					fwrite($file, "</font>");
					fwrite($file, "<!@!>");
					$hintsSoFar++;
					break;
				}
				
				$hintsSoFar++;
				
			}
			if($foundHint)
					break;


		
			
		}
		fclose($file);
		echo "<p>Custom Hint Submited</p>";
	}
	else
		echo "You must create a competition before you can submit hints";
}
else
	echo "You must select a hint before sending one. " . $hintSlected;
?>