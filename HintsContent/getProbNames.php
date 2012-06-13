<?php



$adminCompID = $_COOKIE['adminCompID'];
if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != '')
{
    $file = file("../Competitions/${adminCompID}/${adminCompID}.txt");
    $problemNums = $file[0];
    $content = '<select name="HProbNum" id="HProbNum" size=5 class="Hselect" onchange=showPre(this.value);>';
    $studProbs = explode(',', $file[4]);
    
	for($i = 0; $i < $problemNums; $i++)
	{
		$content .= "<option> ${studProbs[$i]} </option>";
	}
	
	$content .= '</select>';
	echo $content;
}
else 
	echo "You must create a competition before you can send hints.";

?>