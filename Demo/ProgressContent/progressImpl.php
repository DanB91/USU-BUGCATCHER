
	
	<?php if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != ''):?>
	
	<?php	
			$compID = $_COOKIE['compID'];
			$con = mysql_connect("localhost","guest","");
			if(!con)	
			die('Could not connect' . mysql_error());
			mysql_select_db("competition", $con);
			$results = mysql_query("SELECT * FROM ${compID}teams ORDER BY bugsFound DESC,totaltimefound DESC");
			//mysql_query("SELECT * FROM ${compID}teams");
			
			$counter = 1;
	?>	
			
			
	<?php while($row = mysql_fetch_array($results)) : ?>
		<?php if(strcmp($row['teamname'],"") != 0) : //Removes a blank element ?>
	  
			<table class="PTable" rules="all">
			<tr class="PRow">
			  <td class="PTeamName"><?php echo $row['teamname']?></td>
			  <td class="PTeamMember"><?php echo $row['Member1name'] ?></td>
			  <td Class="Pstats"><?php 
										$userName = $row['Member1name']; 
										$userBugs = mysql_query("SELECT * FROM ${compID}Students WHERE username = '${userName}'"); 
										$rowTemp = mysql_fetch_array($userBugs);
										$bugsF = $row['bugsFound'];
										if($bugsF == NULL)
											$bugsF = 0;
											
										echo $bugsF; ?></td>
			  <td Class="Pstats"><?php  $currentTime = $row['timelastfound'];
										$lengthOfTime = strlen($currentTime);
									
										$seconds = substr($currentTime, -2, 2);
										$minutes = substr($currentTime, 0, (lengthOfTime - 2));
										
										if($seconds == NULL)
											$seconds = '0' . '0';
										if($minutes == NULL)
											$minutes = '0' . '0';
											
										$currentTime = $minutes . ":" . $seconds;
										echo $currentTime;
										
																			?></td>
			  <td Class="Pstats"><?php  $currentTime = $row['totaltimefound'];
										$lengthOfTime = strlen($currentTime);
									
										$seconds = substr($currentTime, -2, 2);
										$minutes = substr($currentTime, 0, (lengthOfTime - 2));
										
										if($seconds == NULL)
											$seconds = '0' . '0';
										if($minutes == NULL)
											$minutes = '0' . '0';
										
										$currentTime = $minutes . ":" . $seconds;
										echo $currentTime;
										
																			?></td>
			  <td Class="Pstats"><?php echo $counter; $counter++;?></td>
			</tr>
		<?php endif; endwhile;  mysql_close($con);?>
	
	<?php endif;  ?>