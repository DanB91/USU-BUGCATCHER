<?php
$varNum = $_GET['varNum'];
$AdminID = $_COOKIE['userID'];
$connection = mysql_connect("localhost","guest","");
mysql_select_db("accounts");
$getCompID = mysql_query("SELECT currentcompetition FROM accounts.admins WHERE UserID='$AdminID'");
$compID = mysql_result($getCompID, 0) or die(mysql_error());
setcookie('compID',$compID,time()+60*60*24*30);
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
/*
echo "<script language='javascript'>\n
compSetMode = ".$Mode.";\n
compSetProblems = ".$NumProbs.";\n
compSetHints = ".$Hints.";\n
compSetTime = ".$Time.";\n
compSetID = ".$compID.";\n
</script>";
*/
?>