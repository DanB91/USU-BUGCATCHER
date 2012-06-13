<?php

//The purpose of this code is to retrieve the state the student lives in
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

$state = $row['state'];

echo $state;


mysql_close($con);
?>