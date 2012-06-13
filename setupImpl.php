<?php

$nProbs = $_GET['numProbs'];
$pArr = $_GET['problems'];

function addIDFail()
{
  header('Location: setup.php');
}
function table_exists($tableName)
{
// taken from http://snippets.dzone.com/posts/show/3369
if( mysql_num_rows( mysql_query("SHOW TABLES LIKE '" . $tableName . "'")))
{
        return TRUE;
}
else
{
        return FALSE;
}
}
function int_to_char($value)
{
  $value += 48;
  if ($value > 57)
  {
		$value += 7;
		mt_srand(time());
		if (mt_rand(0,1))
		{
    	$value += 32;
		}
  }
  return chr($value);
}

function generateCompetitionID($newID,$idCounter){
    if($newID ==""){

        $key = "";
        $numCount = 0;
        $alphaCount = 0;
        for ($index = 0; $index < $specialNumber; $index++)
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

  
   
        return strtoupper($key);        
        
    }
    $specialNumber = 8;
    $stringNumber = (string)$idCounter;
    $newString = str_replace(" ","",$newID);
    $newString =  strtoupper(preg_replace("/[^a-zA-Z0-9\s]/", "", $newString));
    if(strlen($newString.$stringNumber) ==$specialNumber){return $newString.$stringNumber;}
    else if(strlen($newString.$stringNumber) <$specialNumber){return str_pad($newString.$idCounter,$specialNumber,"0");}
    else if(strlen($newString.$stringNumber) >$specialNumber && strlen($stringNumber) <$specialNumber-2){
        $rest = substr($newString, 0, $specialNumber - strlen($stringNumber)); 
        return  str_pad($rest.$idCounter,8,"0");
        
    }
    else{

        $key = "";
        $numCount = 0;
        $alphaCount = 0;
        for ($index = 0; $index < $specialNumber; $index++)
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

  
   
        return strtoupper($key);       
    }
}



$CompTime = $_GET["CompTime"];
$codeCov = $_GET['codeCov'];
$inclCD = $_GET['inclCD'];
$newTeamIDm = $_GET['newTeamIDm'];

  if (is_numeric($CompTime) && $CompTime >= 0)
  {
/*    
    echo 'Hints: '.$AllowHints;
    echo '<br>';
    echo 'Time: '.$CompTime.' minutes';
    echo '<br>';*/
    $connection = mysql_connect("localhost","guest","");
    mysql_select_db("competition");
    $loop = 0;
    $myCounter = 0;
    while($loop == 0)
    {
        $myCounter++;
      $compID = generateCompetitionID($newTeamIDm,$myCounter);
      setcookie('adminCompID',$compID, time() + 60*60*24*30);
      if(!file_exists("Competitions/${compID}"))
         mkdir("Competitions/${compID}");
              $studentTable = $compID.'students';
        $teamTable = $compID.'teams';
        
      $getIDExist = mysql_query("SELECT count(primary) FROM competition.usedids WHERE compID='$compID'");
      
      //$IDExist = mysql_result($getIDExist, 0);
      $loop = 0;
      
      if(!$getIDExist && !table_exists($studentTable) && !table_exists($teamTable))
      {
        $loop=1;
        mysql_query("INSERT INTO competition.usedids(compID, joinable) VALUES ('$compID', 1)") or die(addIDFail());

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
        $compFile=fopen("Competitions/${compID}/".$compID.".txt","w+");
        //$compFile=fopen("CompTest.txt","x+");
        if ($compFile)
        //if (fopen("CompTest.txt","x+"))
        {
				
                        
                fwrite($compFile,$nProbs);
                fwrite($compFile,"\r\n");
                fwrite($compFile,"Blank");
                fwrite($compFile,"\r\n");
                fwrite($compFile,$codeCov);
                fwrite($compFile,"\r\n");
                fwrite($compFile,$CompTime);
                fwrite($compFile,"\r\n");
                for($i = 0; $i < $nProbs; $i++)
                {
                    fwrite($compFile, $pArr[$i]);
                }
                fwrite($compFile,"\r\n");
                fwrite($compFile,$inclCD);
                fwrite($compFile,"\r\n");
                fclose($compFile);

                $compFile=fopen("Competitions/${compID}/".$compID.".txt","r");
                $contentToBeDisplayed = fopen("Competitions/${compID}/${compID}Content.txt","w+");
                //echo "Competition Successfully Created.<br>";
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
      else{
          $loop=0;
          
      }
      
    }
  }
  else
  {
    echo $CompTime;
  }

?>
