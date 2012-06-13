<?php

//The purpose of this code is to display the student's school.
//This code is for the team management tab located on the admin side

$currStudent = $_GET['currStudent'];
$currStud 	 = $_GET['currStud'];

$student = explode(', ', $currStudent, 2);
$fname = $student[1];
$lname = $student[0];

$con = mysql_connect('localhost', 'guest', '');

mysql_select_db("accounts", $con);

$sql="SELECT * FROM students WHERE firstname = '${fname}' AND lastname = '${lname}'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$school = $row['school'];

echo $school;


mysql_close($con);
?>
