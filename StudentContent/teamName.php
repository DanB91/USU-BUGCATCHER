<?php
require_once dirname(__FILE__) . "/../header.php";
if(isset($_COOKIE["userObject"]) && $_COOKIE["userObject"] != NULL && isset($_COOKIE["teamObject"]) && $_COOKIE["teamObject"] != NULL)
{
	$teamName = $_SESSION['teamObject']->teamname;
        echo $teamName;
}
else echo 'Student not logged in or on a team.';
?>
