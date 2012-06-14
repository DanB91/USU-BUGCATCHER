<?php
//Retrieves information from the cookies that is needed to access the user's account on the database
$userID = $_COOKIE['userID'];
$studentTable = $_COOKIE["compID"].'students';

//Accesses the database and updates the account information to Logout the user
/*$connection = mysql_connect("localhost","guest","");
mysql_select_db('competition');
$getUser = mysql_query("SELECT username FROM competition.$studentTable WHERE userID='$userID'");
$username = mysql_result($getUser,0);
mysql_select_db('accounts');
mysql_query("UPDATE students SET pingCount='0' WHERE username='$username'");*/

//Expires all of the user's cookies
setcookie('usertype', '', time()-60);
setcookie('userID', '', time()-60);
setcookie('compID','',time()-60);

//Redirects to the homepage
header("Location: index.html");
?>