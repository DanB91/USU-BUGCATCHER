<?php
//Used to set the duration time of cookies to a month
require 'Models/User.php';
require 'Models/Admin.php';
$duration=time()+60*60*24*30;

//Variables used to store the information from the login form
include("mfunctions.php");
$username_str = normalInputProtext($_GET['username']);
$password_str = normalInputProtext($_GET['password']);
$accountType_str = $_GET['usertype'];
//Handles administrator Login
if ($accountType_str == 'admin')
{//This verifies the information provided by the user against the server's database
 
  $ADMIN = ADMIN::login($username_str,$password_str);
  if(!$ADMIN)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "<br>Incorrect username or password.";
  }
  else
  {

        session_start();
        $_SESSION['userid'] = $USER->userid;
        $_SESSION['usertype'] = 'admin';
        $_SESSION['username'] = $USER->username;
        echo "Pie";

  }
}

//Handles student Login
else
{//This verifies the information provided by the user against the server's database
    echo $username_str."<br>";
    echo  $password_str."<br>";
    echo crypt($password_str, SALT);
    if(($USER = User::login($username_str,$password_str)) != 'fds')
            throw new Exception($USER);
    
   
    echo $USER->username;
  if(!$USER)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "<br>Incorrect username or password.";
  }
  else
  {//Username was found and the password is correct
     
    session_start();
    $_SESSION['userid'] = $USER->userid;
    $_SESSION['usertype'] = 'student';
    $_SESSION['username'] = $USER->username;
    echo "Pie";

  }
}

?>