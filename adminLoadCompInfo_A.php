<?php
require 'Models/Competition.php';
session_start();

if(isset($_SESSION['competitionObject'])){
    $_SESSION['competitionObject'];    
    $CompOject = $_SESSION['competitionObject'];

    echo "<table border='5'>";
    echo "<tr><td colspan='2'><center>Competition Information</center?</td></tr>";
    echo "<tr><td>Name</td><td>$CompOject->compname </td></tr>";
    echo "<tr><td>Description</td><td>$CompOject->description </td></tr>";


    echo "<tr><td>Competition Password</td><td>";
    if($CompOject->password){echo "Yes</td></tr>";}
    else{echo "No </td></tr>";}


    echo "<tr><td>Hidden</td><td>";
    if($CompOject->hidden){echo "Yes</td></tr>";}
    else{echo "No </td></tr>";}



    echo "<tr><td>Paused</td><td>";
    if($CompOject->pausestate){echo "Yes</td></tr>";}
    else{echo "No </td></tr>";}


    echo "<tr><td>Joinable</td><td>";
    if($CompOject->notjoinable){echo "No</td></tr>";}
    else{echo "Yes </td></tr>";}

    
    echo "<tr><td>Code Coverage on</td><td>";
    if($CompOject->codecoverage){echo "Yes</td></tr>";}
    else{echo "No </td></tr>";}



    echo "<tr><td>Finish</td><td>";
    if($CompOject->hasfinish){echo "Yes</td></tr>";}
    else{echo "No </td></tr>";}


    echo "</table>";
}
else{
    echo "No Competition Selected";
}

?>
