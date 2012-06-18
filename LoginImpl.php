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

  $ADMIN = Admin::login($username_str,$password_str);
  if(!$ADMIN)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "<br>Incorrect username or password.";
  }
  else
  {

        session_start();
       
        $_SESSION['usertype'] = 'admin';
        $_SESSION['adminObject'] = $ADMIN;
         $_SESSION['test'] = 'test';

  }
}

//Handles student Login
else
{//This verifies the information provided by the user against the server's database
    //echo $username_str."<br>";
    //echo  $password_str."<br>";
    //$password_str
    //echo crypt('password', SALT) ."<br>";
    //echo crypt('password1', SALT) ."<br>";
    //echo crypt($password_str, SALT) ."<br>";
    
    $USER = User::login($username_str,$password_str);

    //echo $USER->username;
  if(!$USER)
  {//Either the username or password provided by the user was incorrect (or both)
    echo "<br>Incorrect username or password.";
  }
  else
  {//Username was found and the password is correct
    session_start();
    $_SESSION['usertype'] = 'student';
    $_SESSION['userObject'] = $USER;
    //echo "Pie";

  }

}

?>