	<?php
		//The purpose of this code is to show the admin the progrss of all teams and their place in the competition.
		//This can be viewd on the admin side under progress
	?>
	
	<?php if(isset($_COOKIE['adminCompID']) && $_COOKIE['adminCompID'] != ''):/*If a comp has been created*/?>
	
	<?php	
			$adminCompID = $_COOKIE['adminCompID'];
			$con = mysql_connect("localhost","guest","");
			if(!con)	
			die('Could not connect' . mysql_error());
			mysql_select_db("competition", $con);
			$results = mysql_query("SELECT * FROM ${adminCompID}teams ORDER BY bugsFound DESC,totaltimefound DESC");//Sort the teams based on bugs found if a tie occures resolve based on totaltimefound
			//mysql_query("SELECT * FROM ${adminCompID}teams");
			
			$counter = 1;
	?>	
			
			
	<?php while($row = mysql_fetch_array($results)) : ?>
		<?php if(strcmp($row['teamname'],"") != 0) : //Removes a blank element ?>
	  
			<table class="PTable" rules="all">
			<tr class="PRow">
			  <td class="PTeamName"><?php echo $row['teamname']//Display team name?></td>
			  <td class="PTeamMember"><?php echo $row['Member1name']//Display the team captain ?></td>
			  <td Class="Pstats"><?php 
										
										$userName = $row['Member1name']; 
										$userBugs = mysql_query("SELECT * FROM ${adminCompID}Students WHERE username = '${userName}'"); 
										$rowTemp = mysql_fetch_array($userBugs);
										$bugsF = $row['bugsFound'];
										if($bugsF == NULL)
											$bugsF = 0;
											
										echo $bugsF;//Display total bugs found ?></td>
			  <td Class="Pstats"><?php  
										//Display the time of last bug found
										$currentTime = $row['timelastfound'];
										$lengthOfTime = strlen($currentTime);
									
										$seconds = substr($currentTime, -2, 2);
										$minutes = substr($currentTime, 0, (lengthOfTime - 2));
										
										if($seconds == NULL)//Format seconds correctly
											$seconds = '0' . '0';
										if($minutes == NULL)//Format minutes correctly
											$minutes = '0' . '0';
											
										$currentTime = $minutes . ":" . $seconds;
										echo $currentTime;
										
																			?></td>
			  <td Class="Pstats"><?php  
										//Display the total time of bugs found
										$currentTime = $row['totaltimefound'];
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
			  <td Class="Pstats"><?php /*Display the place of the team in the competition*/echo $counter; $counter++;?></td>
			</tr>
		<?php endif; endwhile;  mysql_close($con);?>
	
	<?php endif;  ?>