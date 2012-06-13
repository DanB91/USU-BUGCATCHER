<?php
$expire=time()+60*60*24*30;//Expire in a year
$con = mysql_connect("localhost","guest","");
mysql_select_db("accounts", $con);
$results = mysql_query("SELECT * FROM activeusers");
if (mysql_num_rows($results) < 1)
{
	//mysql_query("ALTER TABLE mytable AUTO_INCREMENT = 1");
	mysql_query("TRUNCATE TABLE activeusers");
	setcookie('TRUNCATED',true,$expire);
}
else
{
	setcookie('TRUNCATED',false,$expire);
	while($row = mysql_fetch_array($results))
	{
		$lastPing = $row['lastPing'];
		$pingCount = $row['pingCount'];
		$username = $row['username'];
		$userID = $row['userID'];
		if($lastPing == 0)
		{
			if ($pingCount == 0)
			{
				if(isset($_COOKIE['ZeroPingUser']) && $_COOKIE['ZeroPingUser'] != '' && $pingCount == 0)
				{
					if ($_COOKIE['ZeroPingUser'] == $userID)
					{
						mysql_query("UPDATE students SET sessionactive='0' WHERE username='$username'");
						mysql_query("DELETE FROM activeusers WHERE username='$username'");
					}
					else
					{
						mysql_query("UPDATE activeusers SET lastPing=$pingCount WHERE username='$username'");
					}
				}
				else
				{
					setcookie('ZeroPingUser',$userID,time()+30);
					mysql_query("UPDATE activeusers SET lastPing=$pingCount WHERE username='$username'");
				}
			}
			else
			{
				mysql_query("UPDATE activeusers SET lastPing=$pingCount WHERE username='$username'");
			}
		}
		else
		{
			if ($lastPing == $pingCount)
			{
				mysql_query("UPDATE students SET sessionactive='0' WHERE username='$username'");
				mysql_query("DELETE FROM activeusers WHERE username='$username'");
			}
			else
			{
				mysql_query("UPDATE activeusers SET lastPing=$pingCount WHERE username='$username'");
			}
		}
	}
}
?>