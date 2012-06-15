<?php

if(isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '' && isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{
	$teamName = $_SESSION['teamname'];
        echo $teamName;
}
else echo 'Student not in competition';
?>
