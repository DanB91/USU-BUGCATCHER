<?php
    session_start();
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
    if(isset($_SESSION['adminObject']) && isset($_GET["problem"])){
        try{
            $problem = new Problem($_GET["problem"],"problemname");
            echo intDifficulty($problem->problemdifficulty);
        }
        catch(Exception $e){
            echo 0;
        }
    }
    else{
        echo 0;
    }

?>