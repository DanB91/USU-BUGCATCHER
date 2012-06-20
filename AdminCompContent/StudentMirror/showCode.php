<?php

//The purpose of this code is to show the student the code that they will be debugging.
//The code also shows the code as if it were written in a compiler.
//See prettyprint for more details

set_error_handler('error');

$AdminUsername = $_COOKIE['adminUserName'];
$problem = $_GET["problem"];
$coverage = trim($_GET["coverage"]);
//$compID = $_COOKIE['compID'];
//$userID = $_COOKIE['userID'];
$probNum = $_GET['index'];
$NumProbsC = 0;

if(!file_exists("../../Uploads/${AdminUsername}/Problems/${problem}/${problem}.txt"))
{
    echo "Problem not available.";
    return;
}
      
$fileCode=file("../../Uploads/${AdminUsername}/Problems/${problem}/${problem}.txt");
$problemTxt = "";

//var_dump($fileCode);

$coverageFileLoc = "../../Uploads/${AdminUsername}/TempCompetition/${problem}Coverage.txt";
if(!file_exists($coverageFileLoc)) //create the coverage file if it doesn't exist
{
  $coverageFile = fopen($coverageFileLoc, "w+");
  fclose($coverageFile);
}

//$covFile=file($coverageFileLoc);
$covFile=explode("\n", file_get_contents($coverageFileLoc));
//var_dump($covFile);
$covIndex = 0;
//	var_dump($covFile);

for($i = 0; $i < count($fileCode); $i++)//get file contents
{
  if($coverage == '1') //if coverage is enabled
  {
    //$problemTxt .= "Line: " .$i . " Coverage: " . $covFile[$covIndex] . "CovIndex: " . $covIndex ."\n";
    if($covIndex < count($covFile) && $i == $covFile[$covIndex])
    {
      $problemTxt .= "<SPAN style='BACKGROUND-COLOR: #66CCCC'>" . rtrim($fileCode[$i]) . "</SPAN><br />";
      $covIndex++; //incerement by two because the array has stuff in every other index
    }
    else $problemTxt .= $fileCode[$i];
  }
  else $problemTxt .= $fileCode[$i];
}
substr_replace("<",'&alt',$problemTxt);
file_put_contents("../../Uploads/${AdminUsername}/Problems/${problem}/textProblem.txt", $problemTxt);
die($problemTxt);

//error handler
function error($errNo, $errStr)
{
	echo 'Error: ' . $errStr;
	die();
}


?>
