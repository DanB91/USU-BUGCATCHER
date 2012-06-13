<?php	
			$con = mysql_connect("localhost","guest","");
			mysql_select_db("competition", $con);
			$results = mysql_query("SELECT * FROM team");
			$counter = 0;
			$string = '';
			
		$string .= "<table width=100% bgcolor='#000000'>";	
	 while($row = mysql_fetch_array($results)) {
	 if($counter % 2 == 0) {
		$string .= "<tr bgcolor='#dddddd'>";
		  $string .= "<td width = 35%>" . $row['teamname']. "</td>";
		  $string .= "<td width = 30%>3</td>";
		  $string .= "<td width = 35%>1:32</td>";
		$string .= "</tr>";
	 }		
	 else 
	 {
		$string .= "<tr bgcolor='#9f9f9f'>";
		  $string .= "<td width = 35%>" . $row['teamname']. "</td>";
		  $string .= "<td width = 30%>3</td>";
		  $string .= "<td width = 35%>1:32</td>";
		$string .= "</tr>";
	 } 
	
	$counter++; 
	} 
	$string .=  "</table>";
	echo $string;
	mysql_close($con);
	
?>