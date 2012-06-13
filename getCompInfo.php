<?php
//Variables needed to obtain all competition information
$varNum = $_GET['varNum'];
$AdminID = $_COOKIE['userID'];

//Connecting to and retrieving information from the MySQL database
$connection = mysql_connect("localhost","guest","");
mysql_select_db("accounts");
$getCompID = mysql_query("SELECT currentcompetition FROM accounts.admins WHERE UserID='$AdminID'");
$compID = mysql_result($getCompID, 0) or die(mysql_error());

//Setting the Administrators competition ID cookie
setcookie('compID',$compID,time()+60*60*24*30);

//Reads the information about the competition from the compeitions file on the server
$compFile=fopen("Competitions/".$compID.".txt","r");
$Mode = intval(fgets($compFile));
fwrite($compFile,"\r\n");
$NumProbs = intval(fgets($compFile));
fwrite($compFile,"\r\n");
$Hints = intval(fgets($compFile));
fwrite($compFile,"\r\n");
$Time = intval(fgets($compFile));
fwrite($compFile,"\r\n");
$Language = intval(fgets($compFile));
fwrite($compFile,"\r\n");

//Determines what information needs to be send back to the JavaScript Code in order
//to set the correct values for competition settings.
switch($varNum)
{
	case 1:
		echo $compID;
		break;
	case 2:
		if ($Mode == 0)
		{
			$Mode = "Requirements & Code";
		}
		else
		{
			$Mode = "Requirements, Code, & Code Coverage";
		}
		echo $Mode;
		break;
	case 3:
		echo $NumProbs;
		break;
	case 4:
		if ($Hints == 1)
		{
			$Hints = "YES";
		}
		else
		{
			$Hints = "NO";
		}
		echo $Hints;
		break;
	case 5:
		echo $Time;
		break;
	case 6:
		if ($Language == 0)
		{
			$Hints = "Java";
		}
		else
		{
			$Language = "C++";
		}
		echo $Language;
		break;
}
?>