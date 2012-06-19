<?php

include 'simple_html_dom.php';

/////constants//////
define(ROOT_DIRECTORY, 'C:\Dropbox\htdocs\NewDesign'); //the root directory of the website
///////////////////
set_error_handler('error');

$testInput = mysql_real_escape_string(trim($_POST["testInput"])); //sanitizes input
$testOutput = mysql_real_escape_string(trim($_POST["testOutput"])); //sanitizes output
$isCoverage = $_POST["codeCov"]; //boolean for coverage
$problemName = $_POST["problem"];
$comp = $_SESSION['competitionObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$prob = new Problem($problemName);
$teamID = $team->teamid;
$username = $user->username;

/////error checks and defining variables///////
$con = mysql_connect('localhost','guest','') or	trigger_error('Could not connect' . mysql_error());

mysql_select_db("competition", $con);


$testInput  = mysql_real_escape_string(trim($_POST["testInput"])); //sanitizes input
$testOutput =  mysql_real_escape_string(trim($_POST["testOutput"])); //sanitizes output
$isCoverage = $_POST["codeCov"]; //boolean for coverage
$problemName = $_POST["problemNum"];
$compID 	= $_COOKIE['compID'];
$userID		= $_COOKIE['userID'];
$teamName       = $_SESSION['teamName'];


if(!isset($_COOKIE['compID']) || $_COOKIE['compID'] == '' || $_COOKIE['userID'] == '' || !isset($_COOKIE['userID']))
{
	trigger_error('You must be part of the competion to submit bugs');
}

//input and output cant be just white space or empty
elseif (count(preg_split('/[\n\r\t\s]/', $testInput, NULL, PREG_SPLIT_NO_EMPTY)) == 0 || count(preg_split('/[\n\r\t\s]/', $testOutput, NULL, PREG_SPLIT_NO_EMPTY)) == 0)
{
	trigger_error('Please enter valid input');
}
elseif($problemName == '')
{
	trigger_error('Please select a problem'); 
}

$contentFileName = "C:/DropBox/htdocs/NewDesign/Competitions/$compID/$compID${teamName}Content.txt";//name of the content file

//user must be on a team
/*if(!$onTeam)
{
	trigger_error('User must be on a team');
}*/
///////////////////////////////////

chdir(ROOT_DIRECTORY);

//$bugFileLoc = "Competitions/${compID}/${compID}${teamName}${problemName}Bugs.txt";
$bugFilesInProblemDir = getBugFileNames($problemName);


//now to run the oracle
$oracle = trim(shell_exec("java -jar Problems/${problemName}/${problemName}Oracle.jar ${testInput}"));

//run the buggy code

$buggyOutputs;//will hold the output of all the bugs 


//var_dump($bugFilesInProblemDir);

foreach($bugFilesInProblemDir as $index => $filePath)
{
	$buggyOutputs[$index] = trim(shell_exec("java -jar Problems/${problemName}/${filePath} ${testInput}"));
}





$foundBug = '0'; //will test to see if the user found a bug 
$alreadyFoundBug = false; //tests to see if the bug is already found
$output = $oracle;
foreach ($bugs as $bug) {

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

		

		//increment the number of bugs
		mySQLUpdate("UPDATE ${compID}teams SET bugsFound= IFNULL(bugsFound, 0) + 1 WHERE teamName = '${teamName}'");


		//update leaderboard
		$timeFile = file("Competitions/$compID/${compID}MasterTimer.txt");
		$currentTime = intval($timeFile[0]);
		
		mySQLUpdate("UPDATE ${compID}teams SET timelastfound = ${currentTime} WHERE teamname = '${teamName}'");
		mySQLUpdate("UPDATE ${compID}teams SET totaltimefound= IFNULL(totaltimefound, 0) + ${currentTime} WHERE teamname = '${teamName}'");



		//alert the user they found a bug
		writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$bO'<br>Bug found!", $contentFileName);


		$foundBug = '1';

		break;
	}
}
//if coverage is on, get the line numbers of the program that are executed
chdir("Competitions/$compID/");

if(($lineNums = getExecutedLines($problemName, $testInput, $teamName)))
{

	//var_dump($lineNums);
	file_put_contents("$compID$teamName${problemName}Coverage.txt", implode("\n", $lineNums));
	chdir(ROOT_DIRECTORY);

	//var_dump($lineNums);

}


if($alreadyFoundBug&&!$foundBug)
{
	writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$output'<br>Bug already found!", $contentFileName);

}

else if(!$foundBug)
{
	writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual output: '$oracle'<br>Bug not found!", $contentFileName);
}


echo $foundBug;






//////functions//////////

//returns an array of the line numbers of the executed lines of a program
function getExecutedLines($problemName, $testInput, $teamName)
{



	$lineNums = FALSE;
	$command = "java -cp ../../Problems/emma.jar emmarun -sp ../../Problems/$problemName/src -r html -Dreport.html.out.file=$teamName$problemName/index.html -jar ../../Problems/$problemName/$problemName.jar $testInput";

	
	//run emma to generate the code coverage
	if(!($output = shell_exec($command)))
		trigger_error('Emma call failed ' . $output);

	$greenLines = file_get_html($teamName.$problemName.'/_files/1.html')->find('tr[class=c]');

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

//checks to see if the update failed, if so trigger an error
function mySQLUpdate($update)
{
	if(!mysql_query($update))
		trigger_error('Update failed:' . mysql_error());
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

//gets the resulting array of a query
function getMySQLResultArray($query)
{
	$result = mysql_query($query);

	if(!$result)
		trigger_error('Query Failed: ' . mysql_error());
	

	return mysql_fetch_array($result);
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

/*
   Takes in the name of the problem and ouputs the array of filenames
   that represent each bug in the problem
 */
function getBugFileNames($problemName)
{
	$filesInDir = scandir("Problems/${problemName}");
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

////////////////////////////


?>
