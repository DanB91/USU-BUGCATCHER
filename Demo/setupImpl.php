<?php

include'AdminImpl.php';

function addIDFail()
{
  header('Location: setup.php');
}

function int_to_char($value)
{
  $value += 48;
  if ($value > 57)
  {
    $value += 7;
  }
  return chr($value);
}

function generateCompetitionID()
{
  $key = "";
  mt_srand();
  $numCount = 0;
  $alphaCount = 0;
  
  for ($index = 0; $index < 8; $index++)
  {
    $selection = mt_rand(0,1);
    if ($selection == 0 && $numCount < 4)
    {
        $number = mt_rand(1,9);
        $numCount++;
    }
    else
    {
      if ($alphaCount < 4)
      {
        $number = mt_rand(10,35);
        $alphaCount++;
      }
      else
      {
        $number = mt_rand(1,9);
      }
    }
    $character = int_to_char($number);
    $key = $key.$character;
  }
  //echo '<br>'.$key.' Length:'.strlen($key);
  return $key;
}

$Language  = $_GET["Language"];
$Mode = $_GET["Mode"];
$NumOfProblems = $_GET["NumOfProblems"];
$AllowHints = $_GET["AllowHints"];
$CompTime = $_GET["CompTime"];


  if (is_numeric($CompTime) && $CompTime >= 0)
  {
/*    echo 'Mode: '.$Mode;
    echo '<br>';
    echo 'Problems: '.$NumOfProblems;
    echo '<br>';
    echo 'Hints: '.$AllowHints;
    echo '<br>';
    echo 'Time: '.$CompTime.' minutes';
    echo '<br>';*/
    $connection = mysql_connect("localhost","guest","");
    mysql_select_db("competition");
    $loop = 0;
    while($loop == 0)
    {
      $compID = generateCompetitionID();
      $getIDExist = mysql_query("SELECT count(primary) FROM competition.usedids WHERE compID='$compID'");
      //$IDExist = mysql_result($getIDExist, 0);
      $loop = 0;
      
      if(!$getIDExist)
      {
        mysql_query("INSERT INTO competition.usedids(compID, joinable) VALUES ('$compID', 1)") or die(addIDFail());
        $studentTable = $compID.'students';
        $teamTable = $compID.'teams';
        $compStudentTable = "CREATE TABLE $studentTable
        (
        compStudentIndex int NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(compStudentIndex),
        username varchar(20) UNIQUE,
        userID varchar(20),
        onTeam boolean,
				teamName varchar(20),
        bugsFound int
        )";
        $compTeamTable = "CREATE TABLE $teamTable
        (
        compTeamIndex int NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(compTeamIndex),
        teamname varchar(20),
        Member1name varchar(20),
        Member1ID varchar(20),
        Member2name varchar(20),
        Member2ID varchar(20),
        Member3name varchar(20),
        Member3ID varchar(20),
        bugsFound int,
        timelastfound int,
				totaltimefound int
        )";
        
        mysql_query($compStudentTable,$connection) or die ("Error student table");
        mysql_query($compTeamTable,$connection) or die ("Error team table");
        
        $compFile=fopen("Competitions/".$compID.".txt","w+");
        //$compFile=fopen("CompTest.txt","x+");
        if ($compFile)
        //if (fopen("CompTest.txt","x+"))
        {
					fwrite($compFile,$Mode);
					fwrite($compFile,"\r\n");
					fwrite($compFile,$NumOfProblems);
					fwrite($compFile,"\r\n");
					fwrite($compFile,$AllowHints);
					fwrite($compFile,"\r\n");
					fwrite($compFile,$CompTime);
					fwrite($compFile,"\r\n");
					fwrite($compFile,$Language);
					fwrite($compFile,"\r\n");
					
					fclose($compFile);
					
					$compFile=fopen("Competitions/".$compID.".txt","r");
					$contentToBeDisplayed = fopen("Competitions/${compID}Content.txt","w+");
					//echo "Competition Successfully Created.<br>";
					setcookie('compID',$compID, time() + 60*60*24*30);
					$AdminID = $_COOKIE['userID'];
					mysql_select_db("accounts");
					mysql_query("UPDATE admins SET currentcompetition='$compID' WHERE userID='$AdminID'");
					echo $compID;
					//echo intval(fgets($compFile)).' = Mode<br>';
					//fwrite($compFile,"\r\n");
					//echo intval(fgets($compFile)).' = Problems<br>';
					//fwrite($compFile,"\r\n");
					//echo intval(fgets($compFile)).' = Hints<br>';
					//fwrite($compFile,"\r\n");
					//echo intval(fgets($compFile)).' = Time<br>';
					//fwrite($compFile,"\r\n");
					fclose($compFile);
					fclose($contentToBeDisplayed);
        }
        else
        {
          echo ("Submission failed.");
        }
      }
      $loop=1;
    }
  }
  else
  {
    echo "Invalid time";
  }

?>
