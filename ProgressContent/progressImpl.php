	<?php
            require_once '../header.php';

            $compN = $_COOKIE['compN'];
            
            $lb = new Leaderboard(new Competition($compN, "compname"));
            $stats = $lb->getStats();
            var_dump($stats);
            
            //The purpose of this code is to show the admin the progrss of all teams and their place in the competition.
            //This can be viewd on the admin side under progress
	?>
	
	