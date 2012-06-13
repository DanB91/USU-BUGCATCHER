<?php

$expire=time()+60*60*24*30;//Expire in a year



$username_str = $_GET['username'];
$password_str = $_GET['password'];
$accountType_str = $_GET['usertype'];
$compID_str = $_GET['competitionID'];

$connection = mysql_connect("localhost","guest","");

if(!empty($username_str) && !empty($password_str))
{
	if ($accountType_str == 'admin')
	{
    //$connection = mysql_connect("localhost","guest","");
    mysql_select_db("accounts");
    $get = mysql_query("SELECT count(UserID) FROM accounts.admins WHERE username='$username_str' and password='$password_str'");
    $result = mysql_result($get, 0);
    
     if($result != 1)
    {
      LoginFail();
    }
    else
    {
      $getActive = mysql_query("SELECT sessionactive FROM accounts.admins WHERE username='$username_str'");
      $userActive_bool = mysql_result($getActive,0);
      if (!$userActive_bool)
      {
        $getAdminID = mysql_query("SELECT userID FROM accounts.admins WHERE username='$username_str'");
        $AdminID = mysql_result($getAdminID,0);
        setcookie('usertype', 'admin', $expire);
        setcookie('userID', $AdminID, $expire);
        //header('Location: Admin.html');
        echo "";
      }
      else
      {
        //$_COOKIE['Error'] = 'This user is already active.';
        echo "This user is already active.";
        //header('Location: index.php');
      }
    }
	}
	else
	{
    
    
    //$connection = mysql_connect("localhost","guest","");
    mysql_select_db("accounts");
    $get = mysql_query("SELECT count(UserID) FROM accounts.students WHERE username='$username_str' and password='$password_str'");
    $result = mysql_result($get, 0);
    
    if($result != 1)
    {
      LoginFail();
    }
    else
    {
      $getJoinable = mysql_query("SELECT joinable FROM competition.usedids WHERE compID='$compID_str'") or die("Connection Error");
      if (mysql_num_rows($getJoinable) == 0)
      {
        die("Contest does not exist.");
      }
      $Joinable  = mysql_result($getJoinable,0);
      if ($Joinable)
      {
        $getActive = mysql_query("SELECT sessionactive FROM accounts.students WHERE username='$username_str'") or die("ConnectionError");
        if (mysql_num_rows($getActive) == 0)
        {
          die("Account not found.");
        }
        $userActive_bool = mysql_result($getActive,0);
        if (!$userActive_bool)
        {
          mysql_query("UPDATE students SET sessionactive=1 WHERE username='$username_str'");
          mysql_select_db('accounts');
          mysql_query("INSERT INTO accounts.activeusers(username,pingCount,lastPing) VALUES ('$username_str',0,0)");
          $studentTable = $compID_str.'students';
          mysql_select_db('competition');
          $success = mysql_query("INSERT INTO competition.$studentTable(username,bugsFound) VALUES ('$username_str', 0)");// or die (StudentRejoin());
          if ($success === false)
          {
            $getIndex = mysql_query("SELECT userID FROM competition.$studentTable WHERE username='$username_str'");
            $index = mysql_result($getIndex,0);
            $userID_str = $index;
            //mysql_query("UPDATE $studentTable SET userID='$userID_str' WHERE username='$username_str'");
            setcookie('usertype', 'student', $expire);
            setcookie('userID', $userID_str, $expire);
            setcookie('compID', $compID_str, $expire);
            //die("usertype=".$_COOKIE['usertype']." userID=".$userID_str." compID=".$compID_str);
            //header('Location: Student.html');
            //echo '<script language="javascript">function AfterLogin(){window.location="Student.html";}</script>';
            echo "";
          }
          else
          {
            $getIndex = mysql_query("SELECT compStudentIndex FROM competition.$studentTable WHERE username='$username_str'");
            $index = mysql_result($getIndex,0);
            $userID_str = $compID_str.'student'.$index;
            mysql_query("UPDATE $studentTable SET userID='$userID_str' WHERE username='$username_str'");
            setcookie('usertype', 'student', $expire);
            setcookie('userID', $userID_str, $expire);
            setcookie('compID', $compID_str, $expire);
            //header('Location: Student.html');
            //echo '<script language="javascript">function AfterLogin(){window.location="Student.html";}</script>';
            echo "";
          }
        }
        else
        {
          echo "This user is currently Active.";
          //$_COOKIE['Error'] = 'This user is already active.';
          //header('Location: index.php');
        }
      }
      else
      {
        echo "Sorry, the contest is no longer available.";
        //header('Location: index.php');
      }
    }
	}
}
else
{
  echo "Incorrect Username or Password.";
}

function LoginFail()
{
/*
  echo '
  <html>
  <head>
    <meta http-equiv="refresh" 
    content="5;URL=http://maman.cs.usu.edu">
  </head>
  <body>
    <font color="red">Error!<br>One or more of the following was incorrect: Username, Password, or User Type (Admin/Student)</font>
    <br>
     Redirecting...
  </body>
  </html>';
*/
echo "Login Failed.";
}

function AdminRejoin()
{
  setcookie('usertype', 'admin', $expire);
  setcookie('userID', 'admin', $expire);
  //header('Location: Admin.html');
  echo "";
}

function StudentRejoin()
{
  $compID_str2 = $_GET['competitionID'];
  $studentTable2 = $compID_str2.'students';
  $connection2 = mysql_connect("localhost","guest","");
  mysql_select_db('competition');
  $getIndex2 = mysql_query("SELECT userID FROM competition.$studentTable2 WHERE username='$username_str'") or die(mysql_error());// or die ("Error Rejoining");
  //echo "Mysql Error: " . mysql_error();
  //die();
  $userID_str2 = mysql_result($getIndex2,0);
  if (mysql_num_rows($getIndex2))
  {
    $userID_str2 = mysql_result($getIndex2,0);
  }
  else
  {
    die("No Results Found!");
  }
  //$index2 = mysql_result($getIndex2,0);
  $userID_str = $compID_str.'student'.$index2;
  setcookie('usertype', 'student', $expire);
  setcookie('userID', $userID_str2, $expire);
  setcookie('compID', $compID_str2, $expire);
  //header('Location: Student.html');
  echo "";
}

?>