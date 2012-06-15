<?php

include 'simple_html_dom.php';

set_error_handler('error');

$testInput = mysql_real_escape_string(trim($_POST["testInput"])); //sanitizes input
$testOutput = mysql_real_escape_string(trim($_POST["testOutput"])); //sanitizes output
$isCoverage = $_POST["codeCov"]; //boolean for coverage
$problemName = $_POST["problem"];
$comp = $_SESSION['competitionObject'];
$user = $_SESSION['userObject'];
$team = $_SESSION['teamObject'];
$prob = new Problem($problemName);

define(ROOT_DIRECTORY, 'Competitions/'.$comp->compid); //the root directory of the website
chdir(ROOT_DIRECTORY);

if (!isset($_COOKIE['competitionObject']) || $_COOKIE['competitionObject'] == NULL || $_COOKIE['userObject'] == NULL || !isset($_COOKIE['userObject'])) {
    trigger_error('You must be part of the competion to submit bugs');
} elseif (!isset($_SESSION['teamID']) || $teamID == '') {
    trigger_error("You must be on a team to submit a bug");
}
//input and output cant be just white space or empty
elseif (count(preg_split('/[\n\r\t\s]/', $testInput, NULL, PREG_SPLIT_NO_EMPTY)) == 0 || count(preg_split('/[\n\r\t\s]/', $testOutput, NULL, PREG_SPLIT_NO_EMPTY)) == 0) {
    trigger_error('Please enter an expected input and output');
} elseif ($problemName == '') {
    trigger_error('Please select a problem');
}

$contentFileName = ($team->teamid) . "Content.txt"; //name of the content file
///////////////////////////////////
//now to run the oracle
$oraclePath = $prob->oraclepath;
$oracle = trim(shell_exec("java -jar ${oraclePath} ${testInput}"));

//get bugs from the file
$bugs = $prob->bugs;

$foundBug = '0'; //will test to see if the user found a bug 
$alreadyFoundBug = false; //tests to see if the bug is already found
$output = $oracle;
foreach ($bugs as $index => $bug) {

    $filePath = $bug->filepath;
    $buggyOutput = trim(shell_exec("java -jar ${filePath} ${testInput}"));


    //bug possibly found!
    if ($buggyOutput != $oracle) {
        //test to see if the bug is already in the file
        if ($team->hasFoundBugInCompetition($bug, $comp)) {
            $alreadyFoundBug = true;
            $output = $buggyOutput;
            continue;
        } elseif ($oracle != $testOutput) {
            $output = $buggyOutput;
            break;
        }
        //increment the number of bugs
        $team->foundBugInCompetition($bug, $comp);

        //alert the user they found a bug
        writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$buggyOutput'<br>Bug found!", $contentFileName);
        $foundBug = '1';
        break;
    }
}

if (($lineNums = getExecutedLines($prob, $testInput, $team))) {
    file_put_contents("$compID$teamID${problemName}Coverage.txt", implode("\n", $lineNums));
}

if ($alreadyFoundBug && !$foundBug) {
    writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual Output: '$output'<br>Bug already found!", $contentFileName);
} else if (!$foundBug) {
    writeToContentFile("[Test, $userName, $problemName]<br>Input: '$testInput'<br>Expected output: '$testOutput'<br>Actual output: '$oracle'<br>Bug not found!", $contentFileName);
}

echo $foundBug;


//////functions//////////

//returns an array of the line numbers of the executed lines of a program
function getExecutedLines(Problem $prob, $testInput, Team $team)
{



	$lineNums = FALSE;
	$command = "java -cp ../Problems/emma.jar emmarun -sp ../Problems/$problemName/src -r html -Dreport.html.out.file=$teamID$problemName/index.html -jar ../../Problems/$problemName/$problemName.jar $testInput";

	
	//run emma to generate the code coverage
	if(!($output = shell_exec($command)))
		trigger_error('Emma call failed ' . $output);

	$greenLines = file_get_html($teamID.$problemName.'/_files/1.html')->find('tr[class=c]');

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
