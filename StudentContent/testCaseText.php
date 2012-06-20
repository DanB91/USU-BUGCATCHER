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
$teamID = $team->teamid;

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

$contentFileName = "$teamID/Content.txt"; //name of the content file
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

if (($lineNums = getExecutedLines($prob, $testInput, $teamID))) {
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
function getExecutedLines(Problem $prob, $testInput, $teamID)
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


//error handler
function error($errNo, $errStr)
{
	echo 'Error: ' . $errStr;
	die();
}

////////////////////////////


?>
