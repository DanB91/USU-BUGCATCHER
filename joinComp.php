<?php
require_once "header.php";
$duration=time()+60*60*24*30;

$compSelected = $_GET['compS'];
$userName = $_COOKIE['userName'];

$studentTable = $compSelected.'students';

$con = mysql_connect("localhost", "guest", "");
mysql_select_db("competition", $con);

$createTeam = false;

$success = mysql_query("INSERT INTO competition.$studentTable(username,bugsFound) VALUES ('$userName', 0)");

    if ($success === false)
    {//The student account already exists in the competition's MySQL database table
        $getIndex = mysql_query("SELECT userID FROM competition.$studentTable WHERE username='$userName'");
        $index = mysql_result($getIndex,0);
        $userID_str = $index;
        setcookie('userID', $userID_str, $duration);
        setcookie('compID', $compSelected, $duration);
 
    }
    else
    {//The student account was added to the competition's MySQL database table
        $getIndex = mysql_query("SELECT compStudentIndex FROM competition.$studentTable WHERE username='$userName'");
        $index = mysql_result($getIndex,0);
        $userID_str = $compSelected.'student'.$index;
        mysql_query("UPDATE $studentTable SET userID='$userID_str' WHERE username='$userName'");
        setcookie('userID', $userID_str, $duration);
        setcookie('compID', $compSelected, $duration);

    }

        $compStarted = mysql_query("SELECT * FROM usedids WHERE compID='${compSelected}' AND hasstarted='1'");
        $arr = mysql_fetch_array($compStarted);
  
        if($arr['hasstarted'] == 1)
        {//Competition has started check to see if student is already part of a team
            
            $checkTeam = mysql_query("SELECT COUNT(*) FROM ${compSelected}teams WHERE Member1name='${userName}' OR Member2name='${userName}' OR Member2name='${userName}' ");
            
            $arr = mysql_fetch_array($checkTeam);
            //echo $arr[0];
            if($arr[0] > 0)
            {//Team with student exists
                $createTeam = false;
            }
            else
            {//Team with student does not exist
                $createTeam = true;
            }
            
        }
        else
        {
            //if not create team
            $createTeam = false;
        }
    
   if($createTeam == true)
       echo 1;//create a team
   else
       echo 0;//Do not create a team
    
?>
