<?php
$username_str = $_GET['username'];
$email_str = $_GET['email'];
$accountType_str = $_GET['usertype'];

$connection = mysql_connect("localhost","guest","");
mysql_select_db("accounts");

if ($accountType_str == 'admin')
{
	$sql = "SELECT * FROM accounts.admins WHERE username='${username_str}'";
}
else
{
	$sql = "SELECT * FROM accounts.students WHERE username='${username_str}'";
}

$result = mysql_query($sql);
$row = mysql_fetch_array($result);
	
//Checks whether username and email match
if ($row['email'] == $email_str)
{
	$userKey = encryptUser($username_str);
	$uniqueLink = "<http://www.maman.cs.usu.edu/ResetPassword.php?key=".$userKey."&username=".$username_str."&actType=".$accountType_str;
	$from = "From:bugcatcherreu@gmail.com";
	$subject = "Reset your password";
	$message = "Follow the link below to reset your password on BugCatcher:
	__________________________
	${uniqueLink}
	__________________________
	
	This email was generated automatically.";
	
	if (mail($email_str, $subject, $message, $from))
	{
		echo "Email sent to ".$email_str.". Please check your email and follow the link within to reset your password.";
	}
	else
	{
		echo "Sending email failed. Please try again.";
	}
}
else
{
	die(ResetSendFail());
}


function encryptUser($user)
{
    $encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5("74fjdnfndskknvu74bhvjs"), $user, MCRYPT_MODE_CBC, md5(md5("74fjdnfndskknvu74bhvjs"))));
    return $encrypted;
}

function ResetSendFail()
{
	echo "Your username and/or email do not match our records. Please try again, or create a new account.";
}


?>