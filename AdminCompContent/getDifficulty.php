<?php
    session_start();
    header('Content-Type: application/json');
    require '../Models/Problem.php';
    function intDifficulty($var){
        switch($var){
                case 'VE':return 0;
                case 'E':return 1;
                case 'M':return 2;
                case 'H':return 3;
                case 'VH':return 4;
        }
        return 0;
    }  
    if(isset($_SESSION['adminObject'])){
        
        $problemsSortedByDifficulty = array('VE' => array(), 'E' => array(), 'M' => array(), 'H' => array(), 'VH' => array());
        
        try{
            foreach($_GET["problem"] as $probName)
            {
                $prob = new Problem($probName, 'problemname');
                
                $problemsSortedByDifficulty[$prob->problemdifficulty][] = $prob->problemname;
            }
            echo json_encode($problemsSortedByDifficulty);
        }
        catch(Exception $e){
            echo json_encode(array('Error' => $e->getMessage()));
        }
    }
    else{
        echo json_encode(array('Error' => 'Something went wrong with AJAX.... '));
    }

?>