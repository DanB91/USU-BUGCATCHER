<?php

$problemSelected = $_GET['problemSelected'];
$hintSlected = $_GET['hintSlected'];

$fileCust=file("Hints/preDefHintTestProblem${problemSelected}.txt",FILE_IGNORE_NEW_LINES);

$hintsSoFar = 0;//Used to count the hints since it is possible that hints may span multiple lines
$foundHint = false;
echo "<p>Hint Text: ";
for($line=0;$line<count($fileCust);$line++){

	$messageArr=explode("<!@!>",$fileCust[$line]);
	$count = count($messageArr);

	for($i = 0; $i < $count - 1; $i++)//Print array
	{
		if($hintsSoFar == $hintSlected - 1)//When we get to the correct hint print
		{
			echo $messageArr[$i];//Print the hint
			$fountHint = true;
			$hintsSoFar++;//Used to eliminate the event that a hint may be printed twice
			break;
		}
		
		$hintsSoFar++;
	}
	if($foundHint)
	{
    echo "</p>";
		break;
  }

}

?>