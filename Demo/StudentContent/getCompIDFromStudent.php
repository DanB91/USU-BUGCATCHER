<?php
$comp = $_COOKIE['compID'];
if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{

	//$string = "<h1>";
	//$string .= "Competition ID: " . $comp;
	//$string .="</h1>";
	//echo $comp;//$string;
	//chdir('C:\websites\CS3450\REUTesting');
//chdir('C:\Dropbox\htdocs\NewDesign\OldCode');
	//$file = file("Competitions/${comp}.txt");
	//echo $file[3];
	echo $comp;
}
else
	echo "";

?>