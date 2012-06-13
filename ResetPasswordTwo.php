<?php
$firstname_str = $_GET['firstName'];
$lastname_str = $_GET['lastName'];
$schoolname_str = $_GET['schoolName'];
$username_str = $_GET['username'];
$newPass_str = $_GET['newPass'];
$accountType_str = $_GET['actType'];

$con = mysql_connect("localhost", "guest", "");
mysql_select_db("accounts", $con);

if ($accountType_str == 'admin')
{
	$sql = "SELECT * FROM accounts.admins WHERE username='${username_str}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	if (($row['firstname'] == $firstname_str)&&($row['lastname'] == $lastname_str))
	{
		$password_str = crypt($newPass_str, '$6$rw34ffd3');
		mysql_query("UPDATE accounts.admins SET password = '$password_str' WHERE username = '$username_str'");
		mysql_close($con);
		echo "Your password has been reset. You may now log in.";
	}
	else
	{
		die (InfoMismatchFail());
	}
}
else
{
	$sql = "SELECT * FROM accounts.students WHERE username='${username_str}'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	if (($row['firstname'] == $firstname_str)&&($row['lastname'] == $lastname_str)&&($row['school'] == $schoolname_str))
	{
		$password_str = crypt($newPass_str, '$6$rw34ffd3');
		mysql_query("UPDATE accounts.students SET password = '$password_str' WHERE username = '$username_str'");
		mysql_close($con);
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