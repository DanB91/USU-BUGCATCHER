<?php

include 'simple_html_dom.php';

/////error checks and defining variables///////
$testInput  = mysql_real_escape_string(trim($_GET["testInput"])); //sanitizes input
$testOutput =  mysql_real_escape_string(trim($_GET["testOutput"])); //sanitizes output
$isCoverage = $_GET["codeCov"]; //boolean for coverage
$problemName = $_GET["problemNum"];
require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;
//$compID 	= $_COOKIE['compID'];
//$userID		= $_COOKIE['userID'];

/////constants//////
define(ROOT_DIRECTORY, 'C:/WEB/REU/CurrentTesting'); //the root directory of the website
define(ROOT_DIRECTORY, 'C:/WEB/REU/CurrentTesting/Uploads/'.$AdminUsername); //the root directory of the website
///////////////////
set_error_handler('error');
//input and output cant be just white space or empty
if (count(preg_split('/[\n\r\t\s]/', $testInput, NULL, PREG_SPLIT_NO_EMPTY)) == 0 || count(preg_split('/[\n\r\t\s]/', $testOutput, NULL, PREG_SPLIT_NO_EMPTY)) == 0)
{
	trigger_error('Please enter valid input');
}
elseif($problemName == '')
{
	//trigger_error('Please select a problem');
	trigger_error('No Problem Selected');
}

$contentFileName = "../../Uploads/".$AdminUsername."/TempCompetition/Content.txt";//name of the content file
echo $AdminUsername;
///////////////////////////////////
//chdir(ROOT_DIRECTORY);

$bugFileLoc = "../../Uploads/".$AdminUsername."/TempCompetition/".$problemName."Bugs.txt";
$bugFilesInProblemDir = getBugFileNames($problemName);
//now to run the oracle
$oracle = trim(shell_exec("java -jar ../../Uploads/".$AdminUsername."/Problems/${problemName}/${problemName}Oracle.jar ${testInput}"));
//run the buggy code

$buggyOutputs;//will hold the output of all the bugs 
//var_dump($bugFilesInProblemDir);


foreach($bugFilesInProblemDir as $index => $filePath)
{
	$buggyOutputs[$index] = trim(shell_exec("java -jar ../../Uploads/".$AdminUsername."/Problems/${problemName}/${filePath} ${testInput}"));
}

$foundBug = '0'; //will test to see if the user found a bug 
$alreadyFoundBug = false; //tests to see if the bug is already found
$output = '';
foreach($buggyOutputs as $index => $bO)
{
	//if the supplied output is not equal to the oracle output, obviously the student did not find the bug
	if($oracle != $testOutput)
	{
		break;
	}
	
	$bugName = "bug $index";
	
	//bug possibly found!
	if($bO != $oracle)
	{
		//test to see if the bug is already in the file
		if(isLineInFile($bugName, $bugFileLoc))
		{
			$alreadyFoundBug = true;
			$output = $bO;
			continue;
		}
		
		//add the bug to the file
		$bugFile = fopen($bugFileLoc, "a");
		fwrite($bugFile, $bugName . PHP_EOL);
		fclose($bugFile);

		//alert the user they found a bug
		writeToContentFile("[Test, (You), $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$bO'<br>Bug found!", $contentFileName);

		$foundBug = '1';
		break;
	}
}
//if coverage is on, get the line numbers of the program that are executed
//chdir("Uploads/${AdminUsername}/TempCompetition/");

if(($lineNums = getExecutedLines($problemName, $testInput)))
{
	//var_dump($lineNums);
	file_put_contents("../../Uploads/${AdminUsername}/TempCompetition/${problemName}Coverage.txt", implode("\n", $lineNums));
	//chdir(ROOT_DIRECTORY);

	//var_dump($lineNums);
}

if($alreadyFoundBug&&!$foundBug)
{
	writeToContentFile("[Test, (You), $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$output'<br>Bug already found!", $contentFileName);
}

else if(!$foundBug)
{
	writeToContentFile("[Test, (You), $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual output: '$oracle'<br>Bug not found!", $contentFileName);
}

echo $foundBug;

//returns an array of the line numbers of the executed lines of a program
function getExecutedLines($problemName, $testInput)
{
	$AdminUsername 	= $_COOKIE['adminUserName'];
	$lineNums = FALSE;
	$command = "java -cp ../../Uploads/".$AdminUsername."/Problems/emma.jar emmarun -sp ../../Uploads/".$AdminUsername."/Problems/$problemName/src -r html -Dreport.html.out.file=$problemName/index.html -jar ../../Problems/$problemName/$problemName.jar $testInput";
	
	//run emma to generate the code coverage
	if(!($output = shell_exec($command)))
		trigger_error('Emma call failed ' . $output);

	$greenLines = file_get_html($problemName.'/_files/1.html')->find('tr[class=c]');

	//go through each element in outputted file by emma
	foreach($greenLines as $element)
	{
		while($element->first_child())
		{
			$element = $element->first_child();
			//echo $element;
		}
		
		$lineNums[] = intval($element->innertext) - 1;
	}
	
	return $lineNums;
}

//checks to see if the given line is in the given file
function isLineInFile($line, $fileName)
{
	if(!file_exists($fileName))
		return false;
	
	$fileContents = file($fileName);

	if($fileContents)
	{
		foreach($fileContents as $fileLine)
		{
			if($line.PHP_EOL === $fileLine)
				return true;
		}
	}

	return false;
}

//writes the given string to the content file
function writeToContentFile($stringToWrite, $contentFileName)
{
	$contentFile = fopen($contentFileName,"a");
	//put in time stamp
	date_default_timezone_set('America/Denver');
	fwrite($contentFile, (((date('H')*60)+date('i'))*60+date('s'))."<!@!>");

	fwrite($contentFile, $stringToWrite . '<!@!>');
	fclose($contentFile);

}

//Takes in the name of the problem and ouputs the array of filenames
//that represent each bug in the problem
function getBugFileNames($problemName)
{
	$problemName = $_GET["problemNum"];
	$AdminUsername 	= $_COOKIE['adminUserName'];
	$filesInDir = scandir("../../Uploads/${AdminUsername}/Problems/${problemName}");
	$bugFilesInDir; //will hold the returned array will all the bug files in it
	$i = 1; //index of return array

	foreach($filesInDir as $key => $value)
	{
		//if the file is not a runnable bug file, remove it from the array
		if(preg_match('/.*bug[\d]*\.jar/i', $value))
		{
			$bugFilesInDir[$i++] = $value;
		}
	}

	return $bugFilesInDir;
}

//error handler
function error($errNo, $errStr)
{
	echo 'Error: ' . $errStr;
	die();
}

?>
