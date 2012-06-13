<?php

$currStudent = $_GET['currStudent'];

$student = explode(', ', $currStudent, 2);
$fname = $student[1];
$lname = $student[0];

$con = mysql_connect('localhost', 'guest', '');

mysql_select_db("accounts", $con);

$sql="SELECT * FROM students WHERE firstname = '${fname}' AND lastname = '${lname}'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$str = $row['username'];

echo $str;


mysql_close($con);
?>