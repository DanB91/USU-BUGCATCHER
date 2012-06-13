<?php

$compSelection = $_GET['compS'];
$compSelection = strtolower($compSelection);

//$tName = $_GET['tName'];
//quick fix: By Quentin Mayo
$tName = $_COOKIE['tName'];
$userN = $_COOKIE['userName'];
$userID = $_COOKIE['userID'];

$con = mysql_connect("localhost", "guest", "");
mysql_select_db("competition", $con);

$checkTeam = mysql_query("SELECT COUNT(*) FROM ${compSelection}teams WHERE teamname='${teamN}'");
$arr = mysql_fetch_array($checkTeam);    




if($arr[0] > 0)
{	    
    echo 0;//Team exists
}
else
{//Team does not exist
    
    mysql_query("INSERT INTO ${compSelection}teams (teamname, Member1name, Member1ID) VALUES ('$tName', '$userN', '$userID')");
    $sql="UPDATE ${compSelection}students SET onTeam='1' WHERE username ='${userN}' ";
    mysql_query($sql);
    mysql_query("UPDATE ${compSelection}students SET teamName='${tName}' WHERE username='${userN}'");
    $fileName = "C:/DropBox/htdocs/NewDesign/Competitions/${compSelection}/". strtoupper($compSelection) . $tName . "Content" . ".txt";//Create the team content file
    $file = fopen($fileName,"w+");
    fclose($file);
    echo 1;
}

?>
