<?php
//Variables to store the current ping value and the information needed to access the user's account on the database
$pingCount = $_GET['pingCount'];
$userID = $_COOKIE['userID'];
$studentTable = $_COOKIE["compID"].'students';

//Accesses the database and update the current user's ping value on the database to show they are still logged in
$connection = mysql_connect("localhost","guest","");
mysql_select_db('competition');
$getUser = mysql_query("SELECT username FROM competition.$studentTable WHERE userID='$userID'");
$username = mysql_result($getUser,0);
mysql_select_db("accounts");
mysql_query("UPDATE students SET pingCount=$pingCount WHERE username='$username'");
?>