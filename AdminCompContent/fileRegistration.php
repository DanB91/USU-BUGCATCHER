<?php
//Variablse needed for File Registration
//$compID = $_COOKIE['compID'];
$compID = "S6GEX329";
$copyIndex = 0; //Used for when the filename already exists
$isXML = false;
$isTXT = false;
$originalFileName = $_FILES["file"]["name"];
$fileName = "";

//Checks to see if the file is over 100Kb
//XML would need to contain over 400 students; TXT would contain over 6000 students
if ($_FILES["file"]["size"] > 102400)
{
	die();
}

//This section handles uploading XML files used for detailed file registration
//XML files can be uploaded as needed and will not overwrite previous uploads
if ($_FILES["file"]["type"] == "text/xml")
{
	if ($_FILES["file"]["error"] > 0)
	{
    //echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
		die();
	}
	else
	{
		$_FILES["file"]["name"] = "../Uploads/".$compID.".xml";
		while(file_exists($_FILES["file"]["name"]))
		{
			$copyIndex++;
			$_FILES["file"]["name"] = "../Uploads/".$compID."(".$copyIndex.")".".xml";
		}
		move_uploaded_file($_FILES["file"]["tmp_name"],$_FILES["file"]["name"]);
		$fileName = $_FILES["file"]["name"];
		$isXML = true;
	}
}

//This section handles uploading TXT files used for quick file registration
//Each school must have a separate TXT file
else if ($_FILES["file"]["type"] == "text/plain")
{
	if ($_FILES["file"]["error"] > 0)
	{
		//echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
		die();
	}
	else
	{
		$_FILES["file"]["name"] = "../Uploads/".$compID.".txt";
		while(file_exists($_FILES["file"]["name"]))
		{
			$copyIndex++;
			$_FILES["file"]["name"] = $compID."(".$copyIndex.")".".txt";
		}
		move_uploaded_file($_FILES["file"]["tmp_name"],$_FILES["file"]["name"]);
		$fileName = $_FILES["file"]["name"];
		$isTXT = true;
	}
}
else
{
	echo "Invalid file";
}
if ($isXML)
{
	$javascript = '<script language="javascript">var IS_XML = true;</script>';
	echo $javascript;
}

/*****************************************************/
/*                 File Registration                 */
/*****************************************************/

//This section handles the quick TXT file registration
else if ($isTXT)
{
	$javascript = '<script language="javascript">var IS_XML = false;</script>';
	echo $javascript;
	$regFileTXT = fopen($fileName,"r");
	$txtSchoolName = trim(fgets($regFileTXT));
	$txtState = trim(fgets($regFileTXT));
	
	while (!feof($regFileTXT))
	{
		$txtFirstName = trim(fgets($regFileTXT));
		$txtLastName = trim(fgets($regFileTXT));
		$txtUsername = generateUsername($txtFirstName,$txtLastName);
		$txtPassword = generatePassword();
		$connection = mysql_connect("localhost","guest","");
		mysql_select_db("accounts");
		mysql_query("INSERT INTO accounts.students(username, password, firstname, lastname, school,state, pingCount) VALUES ('$txtUsername', '$txtPassword', '$txtFirstName', '$txtLastName', '$txtSchoolName', '$txtState', 0)") or die (DumpToErrorLog($originalFileName,$fileName,$txtFirstName,$txtLastName,$txtUsername,$txtPassword,$txtSchoolName,$txtState));
		mysql_close($connection);
	}
	fclose($regFileTXT);
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

/*****************************************************/
/*                 Dump To Error Log                 */
/*****************************************************/

function DumpToErrorLog($FileName_Original,$FileName,$FirstName,$LastName,$Username,$Password,$SchoolName,$State)
{
	$length = strlen($FileName) - 3;
	$extension = substr($FileName,$length,3);
	$errorFileName = substr($FileName,0,8);
	$errorIndex = 0;
	if (file_exists("ErrorLogs/" . $errorFileName . ".txt"))//".txt"
	{
		do
		{
			$errorIndex++;
		}while(file_exists("ErrorLogs/" . $errorFileName."(".$errorIndex.").txt"));
		$errorFileName .= "(".$errorIndex.")";
	}
	$errorFileName .= ".txt";
	
	$errorFile = fopen("ErrorLogs/".$errorFileName,"w+");
	
	fwrite($errorFile,"An error occurred during ".strtoupper($extension)." file registration. Below is the information that was being handled at the time of the error.\r\n\r\n");
	
	fwrite($errorFile,"Original File Name: ".$FileName_Original."\r\n");
	fwrite($errorFile,"New File Name: ".$FileName."\r\n");
	fwrite($errorFile,"First Name: ".$FirstName."\r\n");
	fwrite($errorFile,"Last Name: ".$LastName."\r\n");
	fwrite($errorFile,"Username: ".$Username."\r\n");
	fwrite($errorFile,"Password: ".$Password."\r\n");
	fwrite($errorFile,"School Name: ".$SchoolName."\r\n");
	fwrite($errorFile,"State: ".$State."\r\n");
	
	fclose($errorFile);
}
?>

<html>
<head>
<title></title>
<script language="javascript" src="../Scripts/xmlRegistration.js"></script>

</head>

<body>

</body>

</html>