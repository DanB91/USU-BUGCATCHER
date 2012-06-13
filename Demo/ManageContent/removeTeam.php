<?php
$team=$_GET["team"];
$nullValue = NULL;
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{

	$compID = strtolower($_COOKIE['compID']);

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}teams WHERE teamname = '".$team."'";

	$result = mysql_query($sql);
	$nullVal = NULL;

	while($row = mysql_fetch_array($result)){

		if($row['Member1name'] != NULL)
		{
			$temp = "UPDATE ${compID}teams SET Member1ID='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET onteam='0' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}teams SET Member1name='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET teamName='${nullValue}' WHERE username='${userN}'";
			mysql_query($temp);
		}
		elseif($row['Member2name'] != NULL)
		{
			$temp = "UPDATE ${compID}teams SET Member2ID='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET onteam='0' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}teams SET Member2name='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET teamName='${nullValue}' WHERE username='${userN}'";
			mysql_query($temp);
		}
		elseif($row['Member3name'] != NULL)
		{
			$temp = "UPDATE ${compID}teams SET Member3ID='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET onteam='0' WHERE username='${userN}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}teams SET Member3name='${nullValue}' WHERE teamname='${team}'";
			mysql_query($temp);
			$temp = "UPDATE ${compID}students SET teamName='${nullValue}' WHERE username='${userN}'";
			mysql_query($temp);

		}
		else
		{
			//Team Full of current student num is already full
		}
	}
	
	mysql_query("DELETE FROM ${compID}teams WHERE teamname='${team}'");
	
	mysql_close($con);
}
else
	echo"Cookies not set from placeStudentOnTeam";

?>