<?php
function strposOffset($search, $string, $offset)
{
    /*** explode the string ***/
    $arr = explode($search, $string);
    /*** check the search is not out of bounds ***/
    switch( $offset )
    {
        case $offset == 0:
        return false;
        break;
    
        case $offset > max(array_keys($arr)):
        return false;
        break;

        default:
        return strlen(implode($search, array_slice($arr, 0, $offset)));
    }
}
$compID = $_COOKIE['compID'];
$userID	= $_COOKIE['userID'];
$chat   = $_GET['string'];

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '' && isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')
{

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}students WHERE userID = '".$userID."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$onTeam = $row['onTeam'];
	$userName = $row['username'];
	
	if($onTeam == '1')
	{
	$teamName = $row['teamName'];
	$constantDelimiter = "<!@!>";
    //$postedText = $_POST['testInput'];
    $changeSize = 10;
   
    //Read in data
    $fileText = "../Competitions/${compID}/${compID}${teamName}Content.txt";
    $file=fopen($fileText,'r');
    $theData =  fread($file,filesize($fileText));
    fclose($file);
    //check to see if we should enter "stack mode"
    if(substr_count($theData,$constantDelimiter) >= $changeSize){
         $newFileString = substr($theData,strposOffset($constantDelimiter,$theData,1)+strlen($constantDelimiter));
        $fh = fopen($fileText, 'w') or die("can't open file");
        fwrite($fh, $newFileString . $constantDelimiter . "[Chat]" . $userName.": ".$chat);
        fclose($fh);
    }
    else{
        $fh = fopen($fileText, 'a') or die("can't open file");
        fwrite($fh,  $constantDelimiter ."[Chat]" . $userName.": ".$chat);
        fclose($fh);        
    }
	//echo "ddt";
		/*
		$teamName = $row['teamName'];
		
		$file=fopen("../Competitions/${compID}${teamName}Content.txt", "a");
                
                
		fwrite($file, $userName.": ".$chat);
		fwrite($file, "<!@!>");
	
		fclose($file);
		
		mysql_close($con);
		
		echo $chat;
		*/
	}
	else
		echo "You must be on a team";
}
else
	echo "You must be logged in and part of a competition to recieve updates";

?>