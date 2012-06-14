<?php
$username_str = $_GET['username'];
$key_str = $_GET['key'];
$accountType_str = $_GET['actType'];

if (!$username_str == decryptUser($key_str))
{
	die (ResetFail());
}

if (isset($_POST['passOne'])){
	$password_one_str = $_POST['passOne'];
	$password_two_str = $_POST['passTwo'];

	//Check that the two passwords are the same (can add javascript function to give immediate feedback).
	if ($password_one_str == $password_two_str)
	{
		$password_str = crypt($password_one_str, '$6$rw34ffd3');
	
		$connection = mysql_connect("localhost","guest","");
		mysql_select_db("accounts");
	
		if ($accountType_str == 'admin')
		{
			$sql = ("UPDATE 'accounts.admins' SET 'password' = '$password_str' WHERE 'username' = '$username_str'") or die (ResetFail());
			mysql_query($sql);
		}
		else
		{
			$sql = ("UPDATE 'accounts.students' SET 'password' = '$password_str' WHERE 'username' = '$username_str'") or die (ResetFail());
			mysql_query($sql);
		}
	}
	else
	{
		die("Your new passwords don't match. Please try again.");
	}



}

function decryptUser($key)
{
	$decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5("74fjdnfndskknvu74bhvjs"), base64_decode($key), MCRYPT_MODE_CBC, md5(md5("74fjdnfndskknvu74bhvjs"))), "\0");
	return $decrypted;
}

//This should never happen, but just in case...
function ResetFail()
{
  die("Password Reset was unsuccessful. An Unknown problem occured. Please try again.");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<title>Reset Password</title>

<script language="javascript" src="Scripts/ResetPassword.js"></script>
<script language="javascript" src="Scripts/States.js"></script>
<link rel="stylesheet" href="CSS/styles.css" type="text/css" />

</head>

<body>

<div id="container">
	<div id="headerSplash">
	    <h1>Bug Catcher</h1>
    </div>
	
    <div id="content-container">       
		<div id="OneCol">
        	<div name="ResetPasswordError" id="ResetPasswordError"></div>
        	<div id="ResetPassword">
                <form class="form" style="width: 610px;" name="ResetPasswordForm" method="get" onSubmit="event.preventDefault(); resetPassword(); return false;">
					<div class="formHeader"><h3 class="formHeadText">reset password</h3></div>
                    <fieldset>
                    <div id="formColLeft">
                        <p>New Password</p>
                        <input type="password" id="NewPassword" name="NewPassword" class="Itext"><br>
                        <p>Confirm Password</p>
                        <input type="password" id="NewPasswordConfirm" name="NewPasswordConfirm" class="Itext"><br>
                    </div><!--end formColLeft"-->
                    <div id="formColRight">
                        </div><!--end RegistrationRadioBox-->
                    </div><!--end formColRight-->
                    <input id="RegisterButton" type="submit" value="ResetPassword" class="Ibutton">
                    </fieldset>
                    <div id="formFooter"></div>
                </form>
            </div><!--end Registration-->
        </div><!--end OneCol-->

		<div class="nooverflow">&nbsp;</div>
		<div name="ResetPassError" id="ResetPassError"></div>

		<div id="footer">
		</div>
      
    </div><!--content-containter-->
	<div class="nooverflow">&nbsp;</div>
</div><!--end container-->
<div id="JS_Output" style="position: absolute; top: 0px; left: 0px;"></div>
<div id="LoginResult"></div>
</body>

</html>
