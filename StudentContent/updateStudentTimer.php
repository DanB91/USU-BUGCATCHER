<?php



//Gets the competition ID from the user's cookies
$comp = $_COOKIE['compID'];

//Opens the file containing the master time of the competition and sends that time to the students
if(file_exists("../Competitions/${comp}/".$comp."MasterTimer.txt"))
{
    $masterTimer = fopen("../Competitions/${comp}/".$comp."MasterTimer.txt","r");
    echo fgets($masterTimer);
    fclose($masterTimer);
}
else
    echo "Timer failed to load 000";
?>