<?php
$fileName = $_COOKIE['uploadFileName'];
if(isset($_COOKIE['uploadFileName']) && $_COOKIE['uploadFileName'] != '')
{
	echo $fileName;
}
else
{
	echo "";
}
?>