<?php




  if(file_exists ("../Competitions/${adminCompID}/${adminCompID}.txt")){
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


?>
