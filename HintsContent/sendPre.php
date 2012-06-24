<?php
	$problemSelected	= $_GET["problemSelected"];
	$hintSlected 		= $_GET['hintSelected'];
	$probID                 = $_GET['probID'];
        
        require_once '../header.php';
        session_start();

 if(isset($_SESSION['adminObject']))
 {	
    if($hintSlected != '')
    {
	if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
	{
                $admin = $_SESSION['adminObject'];
                $compN = $_COOKIE['compN'];
		
		$fileCust=file("../HintsContent/Hints/PreDefHints/${problemSelected}.txt",FILE_IGNORE_NEW_LINES);
		
		$hintsSoFar = 0;//Used to count the hints since it is possible that hints may span multiple lines
		$foundHint = false;
		
		for($line=0;$line<count($fileCust);$line++)
                {

                    $messageArr=explode("<!@!>",$fileCust[$line]);
                    $count = count($messageArr);

                    for($i = 0; $i < $count - 1; $i++)//Print array
                    {
                        if($hintsSoFar == $hintSlected - 1)//When we get to the correct hint print
                        {
                                $messageArr[$i] = mysql_real_escape_string($messageArr[$i]);
                                $admin->sendHint($admin->getCompetitionByCompName($compN)->compid, $messageArr[$i], $probID);                               
                                $hintsSoFar++;
                                break;
                        }

                        $hintsSoFar++;	
                    }
                    if($foundHint)
                                    break;
			
		}
		echo "<p>Custom Hint Submited</p>";
	}
	else
		echo "You must select a competition before you can submit hints";
    }
    else
            echo "You must select a hint before sending one. ";
}
else
    header( 'Location: index.html');
?>