<?php

require_once 'Models/Admin.php';
require_once 'Models/User.php';

$firstname_str = $_POST['firstName'];
$lastname_str = $_POST['lastName'];
$schoolname_str = $_POST['schoolName'];
$username_str = $_POST['username'];
$newPass_str = $_POST['newPass'];
$accountType_str = $_POST['actType'];

if ($accountType_str == 'admin')
{
	$admin = new Admin($username_str, "username");
	if (($admin->fname == $firstname_str)&&($admin->lname == $lastname_str))
	{echo "here";
		$admin->password = $newPass_str;
                $admin->commitToDB();
		echo "Your password has been reset. You may now log in.";
	}
	else
	{
		die (InfoMismatchFail());
	}
}
else
{
    $user = new User($username_str, "username");
	if (($user->fname == $firstname_str)&&($user->lname == $lastname_str)&&($user->schoolabbr == $schoolname_str))
	{
		$user->password = $newPass_str;
                $user->commitToDB();
                echo ($newPass_str);
		echo "Your password has been reset. You may now log in.";
	}
	else
	{
		die (InfoMismatchFail());
	}
}


function InfoMismatchFail()
{
	echo "Your information does not match our records. Please try again, or create a new account.";
}

?>