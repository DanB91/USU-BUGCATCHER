<?php
//Stores the values of the information provided by the user in the registration fields on the homepage
$firstname_str = $_GET['firstname'];
$lastname_str = $_GET['lastname'];
$schoolname_str = $_GET['schoolname'];
$state_str = $_GET['state'];
$username_str = $_GET['username'];
$password_str = $_GET['password'];
$accountType_str = $_GET['usertype'];

$password_str = crypt($password_str, '$6$rw34ffd3');

//Accesses the database and adds the user account into the database
$connection = mysql_connect("localhost","guest","");
mysql_select_db("accounts");

if ($accountType_str == 'admin')
{//This is run if the user is registering for an administrator account
  mysql_query("INSERT INTO accounts.admins(username, password, firstname, lastname, sessionactive) VALUES ('$username_str', '$password_str', '$firstname_str', '$lastname_str', 0)") or die (RegistrationFail());
}
else
{//This is run if the user is registering for an student account
  mysql_query("INSERT INTO accounts.students(username, password, firstname, lastname, school, state, sessionactive) VALUES ('$username_str', '$password_str', '$firstname_str', '$lastname_str', '$schoolname_str', '$state_str', 0)") or die (RegistrationFail());
}

//This function is called whenever the insertion into the MySQL database fails
//*The insertion will fail when the username provided by the user has already been user for another account*
function RegistrationFail()
{
  echo "Registration Failed! Username already taken.";
}

?>