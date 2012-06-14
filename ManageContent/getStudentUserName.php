<?php

//The purpose of this code is to get the user name of the student that was seleceted
//This code is for the team management tab located on the admin side

$currStudent = $_GET['currStudent'];
$currStud 	 = $_GET['currStud'];
$comp = $_COOKIE['adminCompID'];

$student = explode(', ', $currStudent, 2);
$fname = $student[1];
$lname = $student[0];

$con = mysql_connect('localhost', 'guest', '');

mysql_select_db("accounts", $con);

$sql="SELECT * 
FROM accounts.students, competition.${comp}students
WHERE (
firstname =  '${fname}'
AND lastname =  '${lname}'
AND competition.${comp}students.username = accounts.students.username
)";

"SELECT * FROM students WHERE firstname = '${fname}' AND lastname = '${lname}' NATURAL JOIN FROM competition.${comp}students WHERE 
        accounts.students.username = competition.${comp}students.username";


$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$userName = $row['username'];

echo $userName;

mysql_close($con);
?>