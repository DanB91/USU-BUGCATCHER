<?php
/*
    session_start();
    require '../Models/Problem.php';
    require '../Models/Competition.php';

        //$fContents = Competition::getProblems();
    $arrayProblems = Problem::getProblems();
    $currnetComps = $_SESSION['competitionObject']->getProblems();
    $arrayOfProblems = array();
    $fContents =array();
    foreach($currnetComps as $value){array_push($arrayOfProblems,$value->problemname);}
    foreach($arrayProblems as $value1){
        if(!in_array($value1->problemname,$arrayOfProblems)){
            array_push($fContents,$value1->problemname);
        }   
    }
 * 
 */
       $fContent = array("pie");
    echo json_encode($fContents);
     
    

?>