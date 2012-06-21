<?php
require 'header.php';
session_start();

if(isset($_SESSION['competitionObject'])){
    
    
    $arrayOfStudents = array();
    foreach($_SESSION['competitionObject']->getTeams() as $value){
        foreach($value->getUsers() as $value2){array_push($arrayOfStudents,$value2); }
  
    }
    if(count($arrayOfStudents) > 0){
              echo "<table border='5'>";
                echo "<tr><td colspan='2'><center>Students In Competition</center?</td></tr>";
                echo "<tr><td>Team</td><td>Name([username]:lastname,firstname </td></tr>";
                foreach($_SESSION['competitionObject']->getTeams() as $value){
                    foreach($value->getUsers() as $value2){
                           echo "<tr><td>$value->teamname</td><td>[$value2->username]:$value2->fname,$value2->lname </td></tr>";

                    }
                }
        
        
        



    echo "</table>";      
    }
    else{
        echo "No Students in Competition Selected";
    }
}
else{
    echo "No Competition Selected";
}

?>