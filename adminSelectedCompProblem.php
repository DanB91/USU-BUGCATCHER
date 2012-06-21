<?php
    function strDifficulty($var){
        switch($var){
                case 0:return  ' - Very Easy';
                case 1:return ' - Easy';
                case 2:return ' - Medium';
                case 3:return' - Hard';
                case 4:return' - Very Hard';
        }
        return "None";
    }
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
     require 'header.php';
    session_start();
    echo '<select name="SelectedProblems" id="SelectedProblemsGet" class="Cselect"  size="5" onchange="showProbPreview(this)">';
    if(isset($_SESSION['compArrayObject'])){
        $array = $_SESSION['compProblemArrayObject'];
        echo "<option onDblClick='addProb(this.value)' class='difficulty";
        foreach($AllCompArray as $value){
            if(in_array($value->problem,$AllCompArray2)){echo intDifficulty($value->problemdifficulty)."' value='".$value->problemname. "'>".$value->problemname.strDifficulty($value->problemdifficulty)."</option>";}
            
        }
    }
    echo '</select>';
?>
