<?php
//Used to set the duration time of cookies to a month
$duration=time()+60*60*24*30;

//Variables used to store the information from the login form
$username_str = $_GET['username'];
$password_str = $_GET['password'];
$accountType_str = $_GET['usertype'];
$compID_str = $_GET['competitionID'];

//Connection to access the MySQL database
$connection = mysql_connect("localhost","guest","");

//Handles administrator Login
if ($accountType_str == 'admin')
{//This verifies the information provided by the user against the server's database
  mysql_select_db("accounts");
  $get = mysql_query("SELECT count(UserID) FROM accounts.admins WHERE username='$username_str' and password='$password_str'");
  $result = mysql_result($get, 0);
  
  if($result != 1)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "Incorrect username or password.";
  }
  else
  {//Username was found and the password is correct
    $getPing = mysql_query("SELECT pingCount FROM accounts.admins WHERE username='$username_str'");
    $userPing_bool = mysql_result($getPing,0);
    if (!$userPing_bool)
    {//User account IS NOT active
      $getAdminID = mysql_query("SELECT userID FROM accounts.admins WHERE username='$username_str'");
      $AdminID = mysql_result($getAdminID,0);
      setcookie('usertype', 'admin', $duration);
      setcookie('userID', $AdminID, $duration);
	  setcookie('adminUserName', $username_str, $duration);
      echo "";
    }
    else
    {//User account IS active
      echo "This user is already active.";
    }
  }
}

//Handles student Login
else
{//This verifies the information provided by the user against the server's database
  mysql_select_db("accounts");
  $get = mysql_query("SELECT count(UserID) FROM accounts.students WHERE username='$username_str' and password='$password_str'");
  $result = mysql_result($get, 0);
  
  if($result != 1)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "Incorrect username or password.";
  }
  else
  {//Username was found and the password is correct
    $getJoinable = mysql_query("SELECT joinable FROM competition.usedids WHERE compID='$compID_str'") or die("Connection Error");
    if (mysql_num_rows($getJoinable) == 0)
    {//The competition ID provided by the user does not exist in the server's database
      die("Competition does not exist.");
    }
    $Joinable  = mysql_result($getJoinable,0);
    if ($Joinable)
    {//The competition was found in the server's database and can be joined.
      $getPing = mysql_query("SELECT pingCount FROM accounts.students WHERE username='$username_str'") or die("ConnectionError");
      if (mysql_num_rows($getPing) == 0)
      {//The account was not found in the "students" MySQL database table
        die("Account not found.");
      }
      $userPing = mysql_result($getPing,0);
      if ($userPing == 0)
      {//User account IS NOT active
        $studentTable = $compID_str.'students';
        mysql_select_db('competition');
        $success = mysql_query("INSERT INTO competition.$studentTable(username,bugsFound) VALUES ('$username_str', 0)");
        if ($success === false)
        {//The student account already exists in the competition's MySQL database table
          $getIndex = mysql_query("SELECT userID FROM competition.$studentTable WHERE username='$username_str'");
          $index = mysql_result($getIndex,0);
          $userID_str = $index;
          setcookie('usertype', 'student', $duration);
          setcookie('userID', $userID_str, $duration);
          setcookie('compID', $compID_str, $duration);
          echo "";
        }
        else
        {//The student account was added to the competition's MySQL database table
          $getIndex = mysql_query("SELECT compStudentIndex FROM competition.$studentTable WHERE username='$username_str'");
          $index = mysql_result($getIndex,0);
          $userID_str = $compID_str.'student'.$index;
          mysql_query("UPDATE $studentTable SET userID='$userID_str' WHERE username='$username_str'");
          setcookie('usertype', 'student', $duration);
          setcookie('userID', $userID_str, $duration);
          setcookie('compID', $compID_str, $duration);
          echo "";
        }
      }
      else
      {//User account IS active or was not correctly log out
				sleep(1);
				$getNewPing = mysql_query("SELECT pingCount FROM accounts.students WHERE username='$username_str'") or die("ConnectionError");
				if (mysql_num_rows($getNewPing) == 0)
				{//The account was not found in the "students" MySQL database table
					die("Account not found.");
				}
				$newPing = mysql_result($getNewPing,0);
				if ($newPing == $userPing)
				{//The account is not currently logged in. So log in and use of the account is permitted
					$studentTable = $compID_str.'students';
					mysql_select_db('competition');
					$success = mysql_query("INSERT INTO competition.$studentTable(username,bugsFound) VALUES ('$username_str', 0)");
					if ($success === false)
					{//The student account already exists in the competition's MySQL database table
						$getIndex = mysql_query("SELECT userID FROM competition.$studentTable WHERE username='$username_str'");
						$index = mysql_result($getIndex,0);
						$userID_str = $index;
						setcookie('usertype', 'student', $duration);
						setcookie('userID', $userID_str, $duration);
						setcookie('compID', $compID_str, $duration);
						echo "";
					}
					else
					{//The student account was added to the competition's MySQL database table
						$getIndex = mysql_query("SELECT compStudentIndex FROM competition.$studentTable WHERE username='$username_str'");
						$index = mysql_result($getIndex,0);
						$userID_str = $compID_str.'student'.$index;
						mysql_query("UPDATE $studentTable SET userID='$userID_str' WHERE username='$username_str'");
						setcookie('usertype', 'student', $duration);
						setcookie('userID', $userID_str, $duration);
						setcookie('compID', $compID_str, $duration);
						echo "";
					}
				}
				else
				{//The account is currently logged in. So the account is inaccessable until account activity stops.
        	echo "This account is currently in use.";
				}
      }
    }
    else
    {//The competition has already ended or is temporarily unavailable
      echo "Sorry, the competition is currently unavailable.";
    }
  }
}

?>