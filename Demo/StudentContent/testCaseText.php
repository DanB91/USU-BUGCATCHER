<?php
$testInput  = $_GET["testInput"];
$testOutput = $_GET["testOutput"];
$problemNum = $_GET["problemNum"];
$compID 	= $_COOKIE['compID'];
$userID		= $_COOKIE['userID'];
$isJava		= 1;//used for if statement to decide which language

if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '' && isset($_COOKIE["userID"]) && $_COOKIE["userID"] != '')
{

	$con = mysql_connect("localhost","guest","");
	mysql_select_db("competition", $con);

	$sql="SELECT * FROM ${compID}students WHERE userID = '".$userID."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$onTeam = $row['onTeam'];
	$userName = $row['username'];
	$teamName = $row['teamName'];
	$foundBug = false;
	
	if($testInput != '' && $testOutput != '')
	{
		if($problemNum != '')
		{
			$fileComp=file("../Competitions/${compID}.txt");//get number of allowed problems
			$probNum = substr($problemNum, -1);//Returns the last character in the string which is the problem #
			$isJava = $fileComp[4]; //read the language from the competition file
			if($probNum <= $fileComp[1])
			{
				if($onTeam == '1')
				{
					$file=fopen("../Competitions/${compID}${teamName}Content.txt","a");
					$bugFileLoc = "../Competitions/${compID}${teamName}Bugs.txt";
					$coverageFileLoc = "../Competitions/${compID}${teamName}Problem${probNum}Coverage.txt";
					if(!file_exists($bugFileLoc)) //create file for storing bug info if it doesn't already exist
					{
						$bugFile = fopen($bugFileLoc, "w+");
						for($j = 0; $j < 22; $j++) //add 22 of 23 zeros
							fwrite($bugFile, "0,");
						fwrite($bugFile,"0"); //add final zero without the ,
						fclose($bugFile);
					}
						
					if(!file_exists($coverageFileLoc)) //create the coverage file if it doesn't exist
					{
						$coverageFile = fopen($coverageFileLoc, "w+");
						fclose($coverageFile);
					}

					$oracle;
					$buggyOut;
					$totalBugs;
					if ($isJava == 0)
					{
						switch($probNum)
						{
							case 1:
								$totalBugs = 0;
								$oracle = shell_exec("java -jar ../Problems/Problem1/Problem1Oracle.jar ${testInput}");
								$buggyOut[0] = shell_exec("java -jar ../Problems/Problem1/Problem1bug1.jar ${testInput}");
								$buggyOut[1] = shell_exec("java -jar ../Problems/Problem1/Problem1bug2.jar ${testInput}");
								$buggyOut[2] = shell_exec("java -jar ../Problems/Problem1/Problem1bug3.jar ${testInput}");
								$buggyOut[3] = shell_exec("java -jar ../Problems/Problem1/Problem1bug4.jar ${testInput}");
								break;
							case 2:
								$totalBugs = 4;
								$oracle = shell_exec("java -jar ../Problems/Problem2/Problem2Oracle.jar ${testInput}");
								$buggyOut[0] = shell_exec("java -jar ../Problems/Problem2/Problem2bug1.jar ${testInput}");
								$buggyOut[1] = shell_exec("java -jar ../Problems/Problem2/Problem2bug2.jar ${testInput}");
								$buggyOut[2] = shell_exec("java -jar ../Problems/Problem2/Problem2bug3.jar ${testInput}");
								$buggyOut[3] = shell_exec("java -jar ../Problems/Problem2/Problem2bug4.jar ${testInput}");
								break;
							case 3:
								$totalBugs = 8;
								$oracle = shell_exec("java -jar ../Problems/Problem3/Problem3Oracle.jar ${testInput}");
								$buggyOut[0] = shell_exec("java -jar ../Problems/Problem3/Problem3Oracle.jar ${testInput}");
								$buggyOut[1] = shell_exec("java -jar ../Problems/Problem3/Problem3bug2.jar ${testInput}");
								$buggyOut[2] = shell_exec("java -jar ../Problems/Problem3/Problem3bug3.jar ${testInput}");
								$buggyOut[3] = shell_exec("java -jar ../Problems/Problem3/Problem3bug4.jar ${testInput}");
								$buggyOut[4] = shell_exec("java -jar ../Problems/Problem3/Problem3bug5.jar ${testInput}");
								break;
							case 4:
								$totalBugs = 13;
								$oracle = shell_exec("java -jar ../Problems/Problem4/Problem4Oracle.jar ${testInput}");
								$buggyOut[0] = shell_exec("java -jar ../Problems/Problem4/Problem4bug1.jar ${testInput}");
								$buggyOut[1] = shell_exec("java -jar ../Problems/Problem4/Problem4bug2.jar ${testInput}");
								$buggyOut[2] = shell_exec("java -jar ../Problems/Problem4/Problem4bug3.jar ${testInput}");
								$buggyOut[3] = shell_exec("java -jar ../Problems/Problem4/Problem4bug4.jar ${testInput}");
								$buggyOut[4] = shell_exec("java -jar ../Problems/Problem4/Problem4bug5.jar ${testInput}");
								break;
							case 5:
								$totalBug = 18;
								$oracle = shell_exec("java -jar ../Problems/Problem5/Problem5Oracle.jar ${testInput}");
								$buggyOut[0]= shell_exec("java -jar ../Problems/Problem5/Problem5bug1.jar ${testInput}");
								$buggyOut[1] = shell_exec("java -jar ../Problems/Problem5/Problem5bug2.jar ${testInput}");
								$buggyOut[2] = shell_exec("java -jar ../Problems/Problem5/Problem5bug3.jar ${testInput}");
								$buggyOut[3] = shell_exec("java -jar ../Problems/Problem5/Problem5bug4.jar ${testInput}");
								$buggyOut[4] = shell_exec("java -jar ../Problems/Problem5/Problem5bug5.jar ${testInput}");
								break;
						}
					}
					else
					{
						switch($probNum)
						{
							case 1:
								$totalBug = 0;
								$oracle = shell_exec("../Problems/C++Problems/Problem1/Problem1Oracle.exe ${testInput}");
								$buggyOut[0] = shell_exec("../Problems/C++Problems/Problem1/Problem1Bug1.exe ${testInput}");
								$buggyOut[1] = shell_exec("../Problems/C++Problems/Problem1/Problem1Bug2.exe ${testInput}");
								$buggyOut[2] = shell_exec("../Problems/C++Problems/Problem1/Problem1Bug3.exe ${testInput}");
								$buggyOut[3] = shell_exec("../Problems/C++Problems/Problem1/Problem1Bug4.exe ${testInput}");
								break;
							case 2:
								$totalBug = 4;
								$oracle = shell_exec("../Problems/C++Problems/Problem2/Problem2Oracle.exe ${testInput}");
								$buggyOut[0] = shell_exec("../Problems/C++Problems/Problem2/Problem2Bug1.exe ${testInput}");
								$buggyOut[1] = shell_exec("../Problems/C++Problems/Problem2/Problem2Bug2.exe ${testInput}");
								$buggyOut[2] = shell_exec("../Problems/C++Problems/Problem2/Problem2Bug3.exe ${testInput}");
								$buggyOut[3] = shell_exec("../Problems/C++Problems/Problem2/Problem2Bug4.exe ${testInput}");
								break;
							case 3:
								$totalBug = 8;
								$oracle = shell_exec("../Problems/C++Problems/Problem3/Problem3Oracle.exe ${testInput}");
								$buggyOut[0] = shell_exec("../Problems/C++Problems/Problem3/Problem3Bug1.exe ${testInput}");
								$buggyOut[1] = shell_exec("../Problems/C++Problems/Problem3/Problem3Bug2.exe ${testInput}");
								$buggyOut[2] = shell_exec("../Problems/C++Problems/Problem3/Problem3Bug3.exe ${testInput}");
								$buggyOut[3] = shell_exec("../Problems/C++Problems/Problem3/Problem3Bug4.exe ${testInput}");
								$buggyOut[4] = shell_exec("../Problems/C++Problems/Problem3/Problem3Bug5.exe ${testInput}");
								break;
							case 4:
								$totalBug = 13;
								$oracle = shell_exec("../Problems/C++Problems/Problem4/Problem4Oracle.exe ${testInput}");
								$buggyOut[0] = shell_exec("../Problems/C++Problems/Problem4/Problem4Bug1.exe ${testInput}");
								$buggyOut[1] = shell_exec("../Problems/C++Problems/Problem4/Problem4Bug2.exe ${testInput}");
								$buggyOut[2] = shell_exec("../Problems/C++Problems/Problem4/Problem4Bug3.exe ${testInput}");
								$buggyOut[3] = shell_exec("../Problems/C++Problems/Problem4/Problem4Bug4.exe ${testInput}");
								$buggyOut[4] = shell_exec("../Problems/C++Problems/Problem4/Problem4Bug5.exe ${testInput}");
								break;
							case 5:
								$totalBug = 18;
								$oracle = shell_exec("../Problems/C++Problems/Problem5/Problem5Oracle.exe ${testInput}");
								$buggyOut[0] = shell_exec("../Problems/C++Problems/Problem5/Problem5Bug1.exe ${testInput}");
								$buggyOut[1] = shell_exec("../Problems/C++Problems/Problem5/Problem5Bug2.exe ${testInput}");
								$buggyOut[2] = shell_exec("../Problems/C++Problems/Problem5/Problem5Bug3.exe ${testInput}");
								$buggyOut[3] = shell_exec("../Problems/C++Problems/Problem5/Problem5Bug4.exe ${testInput}");
								$buggyOut[4] = shell_exec("../Problems/C++Problems/Problem5/Problem5Bug5.exe ${testInput}");
								break;								
						}
					}
						echo $oracle;
						echo $testOutput;
					$contentString = "Problem ${probNum} \n" . $userName . ": Tested input " . $testInput . " and Expected output " . $testOutput;
					fwrite($file, $contentString);
					fwrite($file, "<!@!>");
					
					//output the bugs 
					$output = "Input: ${testInput}\n";
					foreach($buggyOut as $bug)
					{
						$output .= "Bug: " . $bug . "\n";
					}
					$output .= "Oracle: " . $oracle;
					echo $output;
					
					if ($isJava == 0){
					$testOutput .= "\n"; }//testOutput needs an extra \n because the actual output is made with a println() herpderp
					//else {rtrim($testOutput);}
					if($testOutput === $oracle)
					{
						$length = count($buggyOut);
						for($i = 0; $i < $length; $i++)
						{	
							if($oracle !== $buggyOut[$i])
							{
								$bugNumber = $totalBugs + $i; //This is the bug number
								$bugs = explode(",",file_get_contents($bugFileLoc)); //make an array of the bugs file
								if($bugs[$bugNumber] == 0)
								{
									$bugs[$bugNumber] = 1; //flag bug as found
									file_put_contents($bugFileLoc, implode(",", $bugs)); //save off the bug as found
									
									//save contents of the bug coverage to the team's problem coverage
									++$i;
									if($isJava == 0)
									{
										$bugCoverageFile = file("../Problems\Problem${probNum}\Problem${probNum}bug${i}.txt");
										file_put_contents($coverageFileLoc, implode("\n", $bugCoverageFile));
									}
									else
									{
										$bugCoverageFile = file("../Problems\C++Problems\Problem${probNum}\Problem${probNum}bug${i}.txt");
										file_put_contents($coverageFileLoc, implode("\n", $bugCoverageFile));
									}
									
									$resultString ="Buggy Output: " . $buggyOut[$i];
									$resultString .="Found a bug!!!\n";
									fwrite($file, $resultString);
									fwrite($file, "<!@!>");
									
									$sql="SELECT * FROM ${compID}teams WHERE teamname = '".$teamName."'";
									$result = mysql_query($sql);
									$row = mysql_fetch_array($result);
									$bugsFound = $row['bugsFound'];
									$bugsFound = $bugsFound + 1;
									$sql = "UPDATE ${compID}teams SET bugsFound='${bugsFound}' WHERE teamname='${teamName}'";
									$result = mysql_query($sql);
									
									// CODE TO UPDATE THE TIME OF THE LAST BUG FOUND	
									$TimeFile = file("../Competitions/${compID}MasterTimer.txt");
									
									$currentTime = $TimeFile[0];

									mysql_query("UPDATE ${compID}teams SET timelastfound='${currentTime}' WHERE teamname = '${teamName}'");
									$result = mysql_query("SELECT * FROM ${compID}teams WHERE teamname = '${teamName}'");
									$row = mysql_fetch_array($result);
									$totalTimeFound = $row['totaltimefound'];
									if($totalTimeFound == NULL)
										$totalTimeFound = 0;
									
									mysql_query("UPDATE ${compID}teams SET totaltimefound='${totalTimeFound}' + '${currentTime}' WHERE teamname = '${teamName}'");
									
									$foundBug = true;
									break;
								}
							}
						}
						if($foundBug != true)
						{
							$resultString =": Did not find a bug.\n";
							fwrite($file, $userName);
							fwrite($file, $resultString);
							fwrite($file, "<!@!>");
						}
						$foundBug = false;
					}
					else
					{
						$resultString =": Did not find a bug.\n";
						fwrite($file, $userName);
						fwrite($file, $resultString);
						fwrite($file, "<!@!>");
					}
					//echo $userName;
					//echo "OK";
					fclose($file);
					mysql_close($con);
				}
				else
					echo "You must be on a team";
			}
			else
				echo "Problem not allowed by admin";
		}
		else
			echo "Please select a problem before submiting test cases";
			
	}
	else
		echo "Please enter input before testing for bugs";

}
else
	echo "You must be part of a competition to submit test cases.";


?>