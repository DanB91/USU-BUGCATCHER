<?php
$pingCount = $_GET['pingCount'];
$userID = $_COOKIE['userID'];
$studentTable = $_COOKIE["compID"].'students';
$connection = mysql_connect("localhost","guest","");
mysql_select_db('competition');
$getUser = mysql_query("SELECT username FROM competition.$studentTable WHERE userID='$userID'");
$username = mysql_result($getUser,0);
mysql_select_db("accounts");
mysql_query("UPDATE activeusers SET pingCount=$pingCount WHERE username='$username'");
echo $pingCount;
?>