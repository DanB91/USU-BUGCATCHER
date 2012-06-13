<?php
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
header("Location: index.html");
?>