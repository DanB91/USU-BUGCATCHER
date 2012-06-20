<?php
require_once "header.php";
//Stores the values of the information provided by the user in the registration fields on the homepage
$firstname_str = $_REQUEST['firstname'];
$lastname_str = $_REQUEST['lastname'];
$schoolname_str = $_REQUEST['schoolname'];
$state_str = $_REQUEST['state'];
$username_str = $_REQUEST['username'];
$adminnickname_str = $_REQUEST['nickname'];
$password_str = $_REQUEST['password'];
$accountType_str = $_REQUEST['usertype'];

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
       mkdir("Uploads/${username_str}",777); //Not sure if this line is redundant or not.
	mkdir("Uploads/${username_str}/Problems",777);
	mkdir("Uploads/${username_str}/TempCompetition",777);
	fclose(fopen("Uploads/${username_str}/TempCompetition/Content.txt","w+"));
	copy("Problems/emma.jar","Uploads/${username_str}/Problems/emma.jar");
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
    }catch(Exception $e){
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