<?php

$comp = $_COOKIE['compID'];

$fnameComp = "../competitions/${comp}/${comp}.txt";
$compArr = file($fnameComp);
$numProbs = $compArr[0];
$problems = 4;
        
$probsArr = explode(",", $compArr[$problems]);

$probContent = array($numProbs);

for($i = 0; $i < $numProbs; $i++)
{
    array_push($probContent, $probsArr[$i]);
}

$r = json_encode($probContent);
echo $r;

?>
