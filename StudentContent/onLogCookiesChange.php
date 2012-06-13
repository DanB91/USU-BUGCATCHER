<?php
$expire=time()+60*60*24*30;
	session_start();
	setcookie("y", 1, $expire);
	$_SESSION["y"] = "1";
	echo $_SESSION["y"] . "Mayo Addded This";
?>
