<?php
    session_start();
    require '../Models/Competition.php';
    require '../Models/Problem.php';
    $fContents= array();
    if(isset($_SESSION['adminObject'])){
        try{
            foreach(Problem::getAllProblems() as $value){
                array_push($fContents,$value->problemname);
            }
        }
        catch(Exception $e){
             
        }
    }

 
      // $fContents = scandir("../../USU-BUGCATCHER/Problems", 0);


       // $ret = json_encode($fContents);

    echo json_encode($fContents);
     
    

?>