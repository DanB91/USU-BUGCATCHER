<?php

$preDefHint = $_GET['hintPreDef'];

$fileCust=file("Hints/preDefHintTestProblem${preDefHint}.txt",FILE_IGNORE_NEW_LINES);

$hintNum = "<select name='HHintNum' size=7 class='Hselect' id='hintCountClear' onclick=showPreHintText(this.value);>";

$counter = 1;

for($line=0;$line<count($fileCust);$line++){

	$messageArr=explode("<!@!>",$fileCust[$line]);
	$count = count($messageArr);

	for($i = 0; $i < $count - 1; $i++)//Print array
	{
		$hintNum .= "<option> ${counter} </option>";
		$counter++;
		
	}

}
 $hintNum .= "</select>";
 echo $hintNum;

?>