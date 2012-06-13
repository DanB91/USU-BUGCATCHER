<?php


$compID				= $_COOKIE['compID'];

if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$customHint ="<font color='#551D00'> Admin: " . $_GET["customHint"] . "</font>";

	$file=fopen("../Competitions/${compID}Content.txt","a");
	fwrite($file, $customHint);
	fwrite($file, "<!@!>");
	//fwrite($file, PHP_EOL);
	fclose($file);
}
else
	echo "You must create a competition before you can submit hints";

?>