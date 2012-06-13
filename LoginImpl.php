<?php
//Used to set the duration time of cookies to a month
$duration=time()+60*60*24*30;

//Variables used to store the information from the login form
include("mfunctions.php");
$username_str = normalInputProtext($_GET['username']);
$password_str = normalInputProtext($_GET['password']);
$accountType_str = $_GET['usertype'];

$password_str = crypt($password_str, '$6$rw34ffd3');

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
//    $getPing = mysql_query("SELECT pingCount FROM accounts.admins WHERE username='$username_str'");
//    $userPing_bool = mysql_result($getPing,0);
//    if (!$userPing_bool)
//    {//User account IS NOT active
      $getAdminID = mysql_query("SELECT userID FROM accounts.admins WHERE username='$username_str'");
      $AdminID = mysql_result($getAdminID,0);
      setcookie('usertype', 'admin', $duration);
      setcookie('userID', $AdminID, $duration);
      setcookie('adminUserName', $username_str, $duration);
      echo "";
//    }
//    else
//    {//User account IS active
//      echo "This user is already active.";
//    }
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
    
//      $getPing = mysql_query("SELECT pingCount FROM accounts.students WHERE username='$username_str'") or die("ConnectionError");
//      if (mysql_num_rows($getPing) == 0)
//      {//The account was not found in the "students" MySQL database table
//        die("Account not found.");
//      }
//      $userPing = mysql_result($getPing,0);
      
//      if ($userPing == 0)
//      {//User account IS NOT active

         
          
          $getAdminID = mysql_query("SELECT userID FROM accounts.students WHERE username='$username_str'");
          $userID_str = mysql_result($getAdminID,0);
          setcookie('userID', $userID_str, $duration);
          setcookie('usertype', 'student', $duration);
          setcookie('userName', $username_str, $duration);
          echo "";

//      }
//      else
//      {//User account IS active or was not correctly log out
/*            sleep(1);
            $getNewPing = mysql_query("SELECT pingCount FROM accounts.students WHERE username='$username_str'") or die("ConnectionError");
            if (mysql_num_rows($getNewPing) == 0)
            {//The account was not found in the "students" MySQL database table
                    die("Account not found.");
            }
            $newPing = mysql_result($getNewPing,0);
            if ($newPing == $userPing)
            {//The account is not currently logged in. So log in and use of the account is permitted

                $getAdminID = mysql_query("SELECT userID FROM accounts.students WHERE username='$username_str'");
                $userID_str = mysql_result($getAdminID,0);
                setcookie('userID', $userID_str, $duration);
                setcookie('usertype', 'student', $duration);
                setcookie('userName', $username_str, $duration);
                echo "";

            }
            else
            {//The account is currently logged in. So the account is inaccessable until account activity stops.
                    echo "This account is currently in use.";
            }
      }*/
  }
}

?>