<?php

$firstname_str = $_GET['firstname'];
$lastname_str = $_GET['lastname'];
$schoolname_str = $_GET['schoolname'];
$state_str = $_GET['state'];
$username_str = $_GET['username'];
$password_str = $_GET['password'];
$accountType_str = $_GET['usertype'];

if(!empty($username_str) && !empty($password_str))
{
  $connection = mysql_connect("localhost","guest","");
  mysql_select_db("accounts");
  
	if ($accountType_str == 'admin')
	{
    mysql_query("INSERT INTO accounts.admins(username, password, firstname, lastname, sessionactive) VALUES ('$username_str', '$password_str', '$firstname_str', '$lastname_str', 0)") or die (RegistrationFail());
    //header('Location: index.php');
    //echo "";
	}
	else
	{
    mysql_query("INSERT INTO accounts.students(username, password, firstname, lastname, school,state, sessionactive) VALUES ('$username_str', '$password_str', '$firstname_str', '$lastname_str', '$schoolname_str', '$state_str', 0)") or die (RegistrationFail());
    //header('Location: index.php');
    //echo "";
	}
}

function RegistrationFail()
{
/*
  echo '
  <html>
  <head>
    <meta http-equiv="refresh" 
    content="3;URL=http://localhost/CS3450/BugStomper_0-2/registration.php">
  </head>
  <body>
    <font color="red">Error: Username already taken</font>
    <br>
     Redirecting...
  </body>
  </html>';
*/
echo "Registration Failed! Username already exists.";
}

?>