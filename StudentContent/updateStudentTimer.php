 <?php



//Gets the competition ID from the user's cookies
$comp = $_COOKIE['compID'];

//Opens the file containing the master time of the competition and sends that time to the students
if(file_exists("../Competitions/${comp}/".$comp."MasterTimer.txt"))
{
    $masterTimer = file("../Competitions/${comp}/".$comp."MasterTimer.txt");
    echo $masterTimer[0];
}
else
    echo "Timer failed to load 000";
?>
