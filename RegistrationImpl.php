<?php
require 'Models/User.php';
require 'Models/Admin.php';
//Stores the values of the information provided by the user in the registration fields on the homepage
$firstname_str = $_GET['firstname'];
$lastname_str = $_GET['lastname'];
$schoolname_str = $_GET['schoolname'];
$state_str = $_GET['state'];
$username_str = $_GET['username'];
$adminnickname_str = $_GET['nickname'];
$password_str = $_GET['password'];
$accountType_str = $_GET['usertype'];

//Accesses the database and adds the user account into the database
$success = true;
if ($accountType_str == 'admin')
{//This is run if the user is registering for an administrator account
    try{
        
        $ADMIN = array(
        'username'=> $username_str,
        'nickname' => $adminnickname_str,
        'password' => $password_str,   

        );
       ADMIN::registerAdmin($ADMIN);
       //print_r($ADMIN);
    }catch(Exception $e ){
        $success = false;
        RegistrationFail();
    }

}
else
{//This is run if the user is registering for an student account
    try{
        $USERARRAY = array(
        'username'=> $username_str,
        'schoolabbr' => $schoolname_str,
        'fname' => $firstname_str,
        'lname' => $lastname_str,
        'stateabbr' =>$state_str,
        'password' => $password_str,   
        );
        USER::registerUser($USERARRAY);
        //print_r($USERARRAY);
    }catch(Exception $e ){
        $success = false;
        RegistrationFail();
    }
}

//This function is called whenever the insertion into the MySQL database fails
//*The insertion will fail when the username provided by the user has already been user for another account*
function RegistrationFail()
{
  echo "Registration Failed! Username already taken.";
}

?>