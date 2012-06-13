<?php
setcookie('usertype', '', time()-60);
setcookie('userID', '', time()-60);
setcookie('compID','',time()-60);
setcookie('Error','',time()-60);
if (!strlen($_COOKIE["Error"]))
{
  //echo "<p style='font-family:timesnewroman;color:red;font-size:20px;'>".$_COOKIE["Error"]."</p>";
  setcookie('Error','',time()-30);
}

if(strlen($_COOKIE["compID"]))
{
  if (!strcmp($_COOKIE['usertype'],'student'))
  {
    $userID = $_COOKIE['userID'];
    $studentTable = $_COOKIE["compID"].'students';
    $connection = mysql_connect("localhost","guest","");
    mysql_select_db('competition');
    $getUser = mysql_query("SELECT username FROM competition.$studentTable WHERE userID='$userID'");
    $username = mysql_result($getUser,0);
    mysql_select_db('accounts');
    mysql_query("UPDATE students SET sessionactive='0' WHERE username='$username'");
    setcookie('usertype', '', time()-60);
    setcookie('userID', '', time()-60);
    setcookie('compID','',time()-60);
  }
  else if(!strcmp($_COOKIE['usertype'],'admin'))
  {
    $userID = $_COOKIE['userID'];
    $studentTable = $_COOKIE["compID"].'students';
    $connection = mysql_connect("localhost","guest","");
    mysql_select_db('competition');
    $getUser = mysql_query("SELECT username FROM competition.$studentTable WHERE userID='admin'");
    $username = mysql_result($getUser,0);
    mysql_select_db('accounts');
    mysql_query("UPDATE admins SET sessionactive='0' WHERE username='$username'");
    setcookie('usertype', '', time()-60);
    setcookie('userID', '', time()-60);
    setcookie('compID','',time()-60);
  }
}
?>