	<?php
            require_once '../header.php';

            $compN = $_COOKIE['compN'];
            
            $lb = new Leaderboard(new Competition($compN, "compname"));
            $stats = $lb->getStats();
         
            $counter = 1;
            //The purpose of this code is to show the admin the progrss of all teams and their place in the competition.
            //This can be viewd on the admin side under progress
	?>	
			
	<?php while($counter <= count($stats) ) : ?>
			  
                    <table class="PTable" rules="all">
                    <tr class="PRow">
                        <td class="PTeamName"><?php echo $stats[$counter - 1]['teamName']//Display team name?></td>
                        <td Class="Pstats"><?php 

                             
                            $bugsF = $stats[$counter - 1]['bugsFound'];
                            if($bugsF == NULL)
                                    $bugsF = 0;

                            echo $bugsF;//Display total bugs found ?></td>
                                <td Class="Pstats"><?php  
                            //Display the time of last bug found
                            $currentTime = $stats[$counter - 1]['lastTimeBugFound'];
                            //$currentTime = substr($currentTime, -8);
                            $currentTime = date("g:i:s a", strtotime($currentTime));
                            if($bugsF == 0)
                                echo "N/A";
                            else
                                echo $currentTime;

                                                                         ?></td>
                            
                        <td Class="Pstats"><?php /*Display the place of the team in the competition*/echo $counter; $counter++;?></td>
                    </tr>
		<?php  endwhile;?></table>
	
