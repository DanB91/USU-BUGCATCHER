<?php
//Array variables containing all the students' information
$firstNamesArray = $_GET['firstNames'];
$firstNames = explode(",",$firstNamesArray[0].",");
$lastNamesArray = $_GET['lastNames'];
$lastNames = explode(",",$lastNamesArray[0].",");
$usernamesArray = $_GET['usernames'];
$usernames = explode(",",$usernamesArray[0].",");
$passwordsArray = $_GET['passwords'];
$passwords = explode(",",$passwordsArray[0].",");
$schoolNamesArray = $_GET['schoolNames'];
$schoolNames = explode(",",$schoolNamesArray[0].",");
$statesArray = $_GET['states'];
$states = explode(",",$statesArray[0].",");
$studentIndexesArray = $_GET['studentIndexes'];
$studentIndexes = explode(",",$studentIndexesArray[0].",");

//Array variable containing all of the team names to be added to the competition
$teamNamesArray = $_GET['teamNames'];
$teamNames = explode(",",$teamNamesArray[0].",");

//Gets the number of teams and students
$tLength = count($teamNames)-1;
$sLength = count($firstNames)-1;

//Checks to make sure the administrator is currently managing a competition
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')//If a competition has been created
{
	//$compIDUpper = $_COOKIE['compID'];
	//$compID = strtolower($compIDUpper);
}
else
{
	//die("No Competition ID!");
}
	$compIDUpper = "S6GEX329";
	$compID = strtolower($compIDUpper);

//Database connection
$con = mysql_connect("localhost","guest","");
mysql_select_db("competition", $con);

//Adds all of the teams to the competition
for ($index=0; $index<$tLength; $index++)
{
	if ($teamNames[$index] == "")
	{
	}
	else
	{
		$sql = "INSERT INTO ${compID}teams (teamname) VALUES ('$teamNames[$index]')";
		mysql_query($sql);
		$fileName = "../Competitions/".$compIDUpper . $teamNames[$index] . "Content" . ".txt";
		$file = fopen($fileName,"w+");
		fclose($file);
	}
}


/*echo "First Name: ".$firstNames[$index];
	echo "\r\nLast Name: ".$lastNames[$index];
	echo "\r\nUsername: ".$usernames[$index];
	echo "\r\nPassword: ".$passwords[$index];
	echo "\r\nSchool Name: ".$schoolNames[$index];
	echo "\r\nState: ".$states[$index];
	die();*/

//Registers the students
mysql_select_db("accounts");
for ($index=0; $index<$sLength; $index++)
{			
	if(!empty($firstNames[$index]) && !empty($lastNames[$index]))
	{
		if(empty($usernames[$index]))
		{
			$usernames[$index] = generateUsername($firstNames[$index],$lastNames[$index]);
		}
		if (empty($passwords[$index]))
		{
			$passwords[$index] = generatePassword();
		}
		mysql_query("INSERT INTO accounts.students(username, password, firstname, lastname, school,state, sessionactive) VALUES ('$usernames[$index]', '$passwords[$index]', '$firstNames[$index]', '$lastNames[$index]', '$schoolNames[$index]', '$states[$index]', 0)") or die ("Registration Failed");
	
		//Adds the student to the competition
		$studentTable = $compID.'students';
		mysql_select_db('competition');
		mysql_query("INSERT INTO competition.$studentTable(username,bugsFound) VALUES ('$usernames[$index]', 0)") or die();
		$getRow = mysql_query("SELECT compStudentIndex FROM competition.$studentTable WHERE username='$usernames[$index]'");
		$rowIndex = mysql_result($getRow,0);
		$studentID = $compID.'student'.$rowIndex;
		mysql_query("UPDATE $studentTable SET userID='$studentID' WHERE username='$usernames[$index]'");
		//Adds the student to a team
		if(!empty($teamNames[$index/3]))
		{
			$team = $teamNames[$index/3];
			mysql_query("UPDATE $studentTable SET teamName='$team' WHERE username='$usernames[$index]'");
			$sql="SELECT * FROM ${compID}teams WHERE teamname = '".$team."'";
		
			$result = mysql_query($sql);
			$nullVal = NULL;
			
			$row = mysql_fetch_array($result);
			
			$memberName = '';
			$memberID = '';
			
			switch($studentIndexes[$index])
			{
				case 1:
					$memberName = 'Member1name';
					$memberID = 'Member1ID';
					break;
				case 2:
					$memberName = 'Member2name';
					$memberID = 'Member2ID';
					break;
				case 3:
					$memberName = 'Member3name';
					$memberID = 'Member3ID';
					break;
				default:
					//echo "ERROR from placeStudentOnTeam.php studNum invalid";
			}
				
			if($row["${memberID}"] == NULL)//If the first student position on the team was selected
			{
				
				$studID = mysql_query("SELECT * FROM ${compID}students WHERE username = '$usernames[$index]'");
				$rowt = mysql_fetch_array($studID);
				$studID = $rowt['userID'];
				
				$temp = "UPDATE ${compID}teams SET ${memberID}='$studentIndexes[$index]' WHERE teamname='$team'";
				mysql_query($temp);
				
				$temp = "UPDATE ${compID}students SET onteam='1' WHERE username='$usernames[$index]'";
				mysql_query($temp);
				$temp = "UPDATE ${compID}students SET teamName='$team' WHERE username='$usernames[$index]'";
				mysql_query($temp);
				$temp = "UPDATE ${compID}teams SET ${memberName}='$usernames[$index]' WHERE teamname='$team'";
				mysql_query($temp);
				
			}
			else
			{
				//Spot taken
			}
		}
	}
}

/*****************************************************/
/*                Username Generation                */
/*****************************************************/

function generateUsername($firstName,$lastName)
{
	$USERNAME_UNIQUE = false;
	$tempUsername = "";
	$tempUsername = substr($lastName,0,5);
	$tempUsername .= substr($firstName,0,3);
	$connection = mysql_connect("localhost","guest","");
	mysql_select_db("accounts");
	while(!$USERNAME_UNIQUE)
	{
		for ($index = 0; $index < 3; $index++)
		{
			$number = mt_rand(0,9);
			$tempUsername .= $number;
		}
		$getOccurances = mysql_query("SELECT count(UserID) FROM accounts.students WHERE username='$tempUsername'");
		$occurances = mysql_result($getOccurances, 0);
		if($occurances == 0)
		{//This means the database does not contain the generated username.
			$USERNAME_UNIQUE = true;
		}
	}
	mysql_close($connection);
	return $tempUsername;
}

/*****************************************************/
/*                Password Generation                */
/*****************************************************/

function generatePassword()
{
  $tempPassword = "";
  $numberCount = 0;
  $letterCount = 0;
	$passwordIndexValue = 0;
  
  for ($index = 0; $index < 10; $index++)
  {
    if (mt_rand(0,1) && $numberCount < 4)
    {
			$passwordIndexValue = mt_rand(2,9);
    }
    else
    {
			if (letterCount < 6)
			{
				if(mt_rand(0,1))
				{//65-90 correspond to A-Z in ASCII
					$passwordIndexValue = mt_rand(65,90);
				}
				else
				{//97-122 correspond to a-z in ASCII
					$passwordIndexValue = mt_rand(97,122);
				}
				$passwordIndexValue = chr($passwordIndexValue);
			}
			else
			{//0 and 1 are omitted to avoid confusion with the letters O and l.
				$passwordIndexValue = mt_rand(2,9);
				
			}
    }
    $tempPassword .= $passwordIndexValue;
  }
  return $tempPassword;
}

?>